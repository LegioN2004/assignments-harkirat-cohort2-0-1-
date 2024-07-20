import { client } from '..';
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
	userId: number,
	title: string,
	description: string
) {
	try {
		await client.connect();
		const query = `INSERT INTO todos (title, description, id) VALUES($1, $2, $3);`;
		const results = await client.query(query, [title, description, userId]);
		if (results.rows.length > 0) {
			return results.rows[0];
		} else {
			return null;
		}
	} catch (error) {
		console.log('some unexpected error occured');
		throw error;
	} finally {
		await client.end();
	}
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
	try {
		await client.connect();
		const query = `UPDATE todos SET done = true WHERE id = $1 RETURNING title, description, done, id;`;
		const { rows } = await client.query(query, [todoId]);
		if (rows.length > 0) {
			return rows[0];
		} else {
			return null;
		}
	} catch (error) {
		console.log('Server error or something is wrong');
		throw error;
	} finally {
		await client.end();
	}
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
	try {
		await client.connect();
		const query = `SELECT title, description, done, id FROM todos WHERE user_id = $1;`;
		const { rows } = await client.query(query, [userId]);
		return rows;
	} catch (error) {
		console.log('Some error happened');
		throw error;
	} finally {
		await client.end();
	}
}
