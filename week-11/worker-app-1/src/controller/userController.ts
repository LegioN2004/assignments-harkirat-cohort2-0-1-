import { PrismaClient } from '@prisma/client/edge';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcrypt';
import { Context } from 'hono';
import { sign as JwtSign } from 'hono/jwt';
import { userSchema } from '../zod/types';

enum StatusCode {
	BADREQ = 400,
	NOTFOUND = 404,
	NOTPERMISSIOON = 403,
}

export const signup = async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const requestBody: {
			email: string;
			username: string;
			password: string;
		} = await c.req.json();

		const parsedBody = userSchema.safeParse(requestBody);

		if (!parsedBody.success) {
			return c.body('Invalid user input, fix the typo', StatusCode.BADREQ);
		}

		const isUserExist = await prisma.user.findFirst({
			where: { email: requestBody.email },
		});

		if (isUserExist) {
			return c.body(
				'Email already exists in the database, create a new one or fix the current one',
				StatusCode.BADREQ
			);
		}

		const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

		const response = await prisma.user.create({
			data: {
				username: parsedBody.data.username,
				email: parsedBody.data.email,
				password: hashedPassword,
			},
		});

		const userId = response.id;
		const signedToken = await JwtSign({ userId }, c.env.JWT_SECRET);

		return c.json({
			message: 'login successfully',
			token: signedToken,
			success: 'true',
			user: {
				userId: userId,
				username: response.username,
				email: response.email,
			},
		});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return c.json({ message: 'email already taken, give proper email.' });
			} else {
				return c.json({ error: `Login failed due to ${error}` }, 500);
			}
		}
	} finally {
		await prisma.$disconnect();
	}
};

export const signin = async (c: Context) => {
	const prisma = new PrismaClient({
		datasources: {
			db: {
				url: c.env.DATABASE_URL,
			},
		},
	}).$extends(withAccelerate());

	try {
		const requestBody: { email: string; password: string } = await c.req.json();
		const parsedBody = userSchema.safeParse(requestBody);
		if (!parsedBody.success) {
			return c.json(
				{
					message: 'Invalid details sent, please try again by fixing the typo',
				},
				StatusCode.BADREQ
			);
		}

		const findUser = await prisma.user.findUnique({
			where: {
				email: parsedBody.data.email,
			},
		});
		if (findUser == null) {
			return c.json({
				message:
					"the email wasn't found in the database, sign in first to get access",
			});
		}

		const passwordMatch = await bcrypt.compare(
			parsedBody.data.password,
			findUser.password
		);
		if (!passwordMatch) {
			return c.json(
				{ message: "The passwords don't match, use the correct password" },
				StatusCode.NOTPERMISSIOON
			);
		}

		const userId = findUser.id;
		const signedToken = await JwtSign({ userId }, c.env.JWT_SECRET);

		return c.json({
			message: 'Successfully logged in',
			token: signedToken,
			user: {
				userId: userId,
				username: findUser.username,
				email: findUser.email,
			},
		});
	} catch (error) {
		return c.body(`Internal server error: ${error}`, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const userProfile = async (c: Context) => {
	const prisma = new PrismaClient({
		datasources: {
			db: {
				url: c.env.DATABASE_URL,
			},
		},
	}).$extends(withAccelerate());

	try {
		const body: {
			username: string;
		} = await c.req.json();

		const findUser = await prisma.user.findFirst({
			where: {
				// NOTE: remember to make the id convert to a number since it'll be a number always or else the database/ORM will throw an error.
				id: Number(c.req.param('id')),
			},
			include: {
				posts: true,
			},
		});

		if (!findUser) {
			return c.body(
				'Post not found, put the correct post id or check if posts has been created or not',
				StatusCode.NOTFOUND
			);
		}

		if (findUser == null) {
			return c.body(
				'User not found, please try again properly',
				StatusCode.BADREQ
			);
		} else {
			return c.json({
				id: findUser.id,
				username: findUser.username,
				email: findUser.email,
				posts: findUser.posts,
			});
		}
	} catch (error) {
		return c.body(`Internal server error: ${error}, try later`, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const getAllUsers = async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const users = await prisma.user.findMany();
		return c.json({
			users: users.map((user) => ({
				id: user.id,
				username: user.username,
				email: user.email,
			})),
		});
	} catch (error) {
		return c.body(`Internal server error: ${error}`, 500);
	} finally {
		await prisma.$disconnect();
	}
};
