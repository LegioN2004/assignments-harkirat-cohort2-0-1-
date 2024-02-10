export default function ProfileComponents() {
	const fetchData = async () => {
		const res = await fetch('https://api.github.com/users/LegioN2004');
		const data = await res.json();
		console.log(data);
		return data;
	};
	return (
		<>
			<div>{fetchData()}</div>
		</>
	);
}
