import { PrismaClient } from '@prisma/client/edge';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import {
	decode as JwtDecode,
	sign as JwtSign,
	verify as JwtVerify,
} from 'hono/jwt';
import { v4 as uuidv4 } from 'uuid';
import { createPost, createUser } from './zod/types';

enum StatusCode {
	BADREQ = 400,
	NOTFOUND = 404,
	NOTPERMISSIOON = 403,
}

const app = new Hono();

app.use(cors());

app.get('/', (c) => {
	console.log('helooooooooooooo, broooooooooooooo');
	return c.text('Hello Hono, hi and bye bye!');
});

app.route('/api/v1/users', userRoute);
app.route('/api/v1/posts', postRoute);
app.route('/api/v1/tags', tagRoute);

app.post('/users/signup', async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const requestBody: {
			email: string;
			username: string;
			password: string;
		} = await c.req.json();

		const parsedBody = createUser.safeParse(requestBody);

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

		const token = await JwtSign(
			{ email: parsedBody.data.email, username: parsedBody.data.username },
			c.env.JWT_SECRET
		);

		const response = await prisma.user.create({
			data: {
				username: parsedBody.data.username,
				email: parsedBody.data.email,
				password: parsedBody.data.password,
			},
		});

		const userId = response.id;

		const tokenSign = await JwtSign({ userId }, c.env.JWT_SECRET);

		return c.json({
			message: 'login successfully',
			token: tokenSign,
			success: 'true',
			user: {
				userId: response.id,
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
	}
});

// middleware for signing in
app.use('/users/signin', async (c, next) => {
	try {
		const authToken = await c.req
			.header('Authorization')
			?.replace('Bearer', '');
		if (!authToken) {
			return c.json({ error: 'Invalid credentials' }, 401);
		}

		const verifyToken = await JwtVerify(authToken, c.env.JWT_SECRET);
		return c.json({ token: verifyToken });
	} catch (error) {
		console.log('error: ', error);
		return c.json({ error: 'Login failed' }, 500);
	}
});

// async function findUser(env: Env, id: string) {
// 	const prisma = getPrisma(env.DATABASE_URL);
// 	// return prisma.user.findUnique({
// 	// 	where: {
// 	// 		userId: id,
// 	// 	},
// 	// });
// }

app.post('/users/signin', async (c) => {
	const requestBody = await c.req.json();
	const parsedBody = createUser.safeParse(requestBody);
	const userId: string = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

	if (parsedBody.success) {
		console.log(parsedBody);
		const { email, username, password } = parsedBody.data;
		// add the jwt here or above in the function findUser
		// await findUser(c.env, userId);
	} else {
		return c.json({ message: 'Invalid details sent, please try again' });
	}
	return c.json({ message: 'Hello World', userId: userId });
});

export default app;
