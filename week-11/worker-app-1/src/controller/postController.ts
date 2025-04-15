import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { postSchema } from '../zod/types';

enum StatusCode {
	BADREQ = 400,
	NOTFOUND = 404,
	NOTPERMISSIOON = 403,
}

export const getAllPost = async (c: Context) => {
	const prisma = await new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const posts = await prisma.post.findMany({
			include: {
				Tags: true,
				User: true,
			},
		});
		return c.json({
			posts: posts.map((res) => ({
				id: res.id,
				username: res.User.username,
				userId: res.userId,
				title: res.title,
				content: res.content,
				body: res.body,
				tags: res.Tags,
				createdAt: res.createdAt,
			})),
		});
	} catch (error) {
		c.body(`Internal server error: ${error}`, 500);
	}
};

export const getUserPost = async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	// gotta find posts acc to the userid as many as possible so not prisma.user but prisma.posts
	try {
		const res = prisma.post.findMany({
			where: {
				id: Number(c.body('userId')),
			},
		});
		return c.json({
			posts: res,
		});
	} catch (error) {
		return c.body(`Internal server error occured: ${error}`, 500);
	}
};

export const getPostById = async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const id: number = Number(c.req.param('id'));

		const findPost = await prisma.post.findUnique({
			where: {
				id: id,
			},
			include: {
				Tags: true,
			}
		});

		if (findPost == null) {
			return c.body("The post doesn't exist", StatusCode.NOTFOUND);
		}

		return c.json({
			posts: {
				id: findPost.id,
				title: findPost.title,
				body: findPost.body,
				tags: findPost.Tags.map((d) => d.tag)
			}
		})
	} catch (error) {
		return c.body(`Internal server error ${error}`, 500);
	}
};

export const createPost = async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const data: { title: string; body: string; Tags: string } =
			await c.req.json();

		const tagsData = data.Tags.split(',').map((value) => {
			return value.trim();
		});

		if ((data.body && data.title) == null) {
			return c.body('Invalid user input', StatusCode.BADREQ);
		}

		const posts = await prisma.post.create({
			data: {
				title: data.title,
				body: data.body,
				userId: c.get('userId'),
				Tags: {
					connectOrCreate: tagsData.map((tag) => ({
						where: { tag: tag },
						create: { tag: tag },
					})),
				},
			},
			include: {
				Tags: true,
			},
		});

		return c.json({
			message: 'Post created successfully',
			posts: {
				id: posts.id,
				title: posts.title,
				body: posts.body,
				tags: posts.Tags.map((tag) => tag.tag),
				createdAt: posts.createdAt,
			},
		});
	} catch (error) {
		return c.body(`Internal server error ${error}`, 500);
	}
};

