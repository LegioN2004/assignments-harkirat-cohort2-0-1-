import { useEffect, useState } from 'react';
import './App.css';
// import ProfileComponents from './components/ProfileComponents';

function App() {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('https://api.github.com/users/LegioN2004');
				const data = await res.json();
				setUserData(data);
			} catch (error) {
				console.error('Error fetching data', error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div>
				{userData ? (
					<div>
						<img src={userData.avatar_url} alt="GitHub Avatar" />
						<h2>{userData.name}</h2>
						<p>{userData.bio}</p>
						<p>Followers: {userData.followers}</p>
						<p>Following: {userData.following}</p>
						<p>Public Repositories: {userData.public_repos}</p>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}

export default App;
