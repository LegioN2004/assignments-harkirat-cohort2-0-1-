import { Context, Hono, Next } from 'hono';
import {
	getAllPost,
	getUserPost,
	createPost,
	getPostById,
	updatePostById,
	deletePost,
} from '../controller/postController';
const postRouter = new Hono();

postRouter.get('/all-posts', getAllPost); // get posts
postRouter.get('/user-posts', getUserPost); // get posts
postRouter.post('/posts', createPost); // create posts
postRouter.get('/posts/:id', getPostById); // get posts by id
postRouter.put('/posts/:id', updatePostById); // update posts by id
postRouter.delete('/posts/:id', deletePost); // update posts by id
