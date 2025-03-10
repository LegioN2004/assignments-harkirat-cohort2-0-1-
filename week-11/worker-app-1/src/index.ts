import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { postRouter } from './routes/postRoute';
import { userRouter } from './routes/userRoute';

const app = new Hono();

app.use(cors());

app.get('/', (c) => {
	console.log('helooooooooooooo, broooooooooooooo');
	return c.json({ message: 'Hello World, brooooooooooooooooooooooo' });
});

app.route('/api/v1/users', userRouter);
app.route('/api/v1/posts', postRouter);
app.route('/api/v1/tags', tagRouter);
