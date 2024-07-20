import { client } from '..';

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
	username: string,
	password: string,
	name: string
) {
	try {
		await client.connect();
		const query = `INSERT INTO users (username, password, name) VALUES ($1, $2, $3);`;
		const res = await client.query(query, [username, password, name]);
		return res;
	} catch (error) {
		console.log('some unexpected error occured');
		throw error;
	} finally {
		await client.end();
	}
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
	try {
		await client.connect();
		const query = `SELECT * FROM users WHERE id = $1;`;
		const results = await client.query(query, [userId]);
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
