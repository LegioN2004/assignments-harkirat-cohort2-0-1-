import zod, { number, string } from 'zod';

const createPost = zod.object({
	title: string(),
	content: string(),
	userId: number(),
});

const createUser = zod.object({
	email: string().email({ message: 'Invalid email address' }),
	username: string().min(6),
	password: string().min(5),
});

export { createPost, createUser };
