import { useState } from 'react';
// import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
// import { countAtom } from './store/atoms/atoms';

function App() {
	const [count, setCount] = useState();
	return (
		<>
			<input
				type="text"
				placeholder="enter the number of words"
				onChange={(e) => {
					setCount(e.target.value);
				}}
			></input>
			<CalculatedComponent count={count} />
		</>
}

function CalculatedComponent({ count }) {
	const words = useRecoilValueLoadable(countAtom(count));
	return (
		<>
			<p>{words}</p>
		</>
	);
}

export default App;
