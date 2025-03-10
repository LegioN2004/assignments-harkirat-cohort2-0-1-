import { Next } from 'hono';
import { Jwt as jwt } from 'hono/utils/jwt';

// middleware for signing in
export const authMiddleware = async (c: any, next: Next) => {
	try {
		const authToken: string = await c.req.header('Authorization')?.split()[1];
		if (authToken !== null || authToken !== undefined) {
			const decode = await jwt.verify(authToken, c.env.JWT_SECRET);
			if (decode) {
				c.set('userId', decode);
				await next();
			} else return c.json({ error: 'you are an unauthorized user ' }, 401);
		} else return c.json({ error: 'you are an unauthorized user ' }, 401);
	} catch (error) {
		return c.json({ error: 'Login failed, unauthorized' }, 500);
	}
};
