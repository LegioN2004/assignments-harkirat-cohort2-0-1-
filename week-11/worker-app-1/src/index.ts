import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
	decode as JwtDecode,
	sign as JwtSign,
	verify as JwtVerify,
} from 'hono/jwt';
import { v4 as uuidv4 } from 'uuid';
import { getPrisma } from './prismaFunction';
import { createPost, createUser } from './types';

interface Env {
	DATABASE_URL: string;
	JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use('/*', cors());

app.get('/', (c) => {
	console.log('helooooooooooooo, broooooooooooooo');
	return c.text('Hello Hono, hi and bye bye!');
});

async function insertUser(
	env: Env,
	email: string,
	username: string,
	password: string
) {
	const prisma = getPrisma(env.DATABASE_URL);
	return prisma.user.create({
		data: { email, username, password },
	});
}

app.post('/users/signup', async (c) => {
	const requestBody = await c.req.json();
	const parsedBody = createUser.safeParse(requestBody);
	try {
		if (parsedBody.success) {
			const token = await JwtSign(
				{ email: parsedBody.data.email, username: parsedBody.data.username },
				c.env.JWT_SECRET
			);
			const { email, username, password } = parsedBody.data;
			await insertUser(c.env, email, username, password);
			return c.json({ success: 'true', token });
		} else {
			return c.json({ message: 'Invalid details sent, please try again' }, 401);
		}
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return c.json({ message: 'email already taken, give proper email.' });
			} else {
				console.log('error: ', error);
				return c.json({ error: 'Login failed' }, 500);
			}
		}
	}
	const userId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
	return c.json({ message: 'Hello World', userId: userId });
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
