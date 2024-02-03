import { useState } from 'react';
import './App.css';

function App() {
	const [color, setColor] = useState('#ffffff');

	const backgroundColor = (color2) => {
		setColor(color2);
	};
	return (
		<div>
			<BgChanger onColorChange={backgroundColor}></BgChanger>
			<Background color={color}></Background>
		</div>
	);
}

function BgChanger({ onColorChange }) {
	return (
		<div>
			<button
				style={{ background: 'red' }}
				onClick={() => {
					onColorChange('red');
				}}
			>
				Red
			</button>
			<button
				style={{ background: 'green' }}
				onClick={() => {
					onColorChange('green');
				}}
			>
				Green
			</button>
			<button
				style={{ background: 'blue' }}
				onClick={() => {
					onColorChange('blue');
				}}
			>
				Blue
			</button>
			<button
				style={{ background: 'yellow' }}
				onClick={() => {
					onColorChange('yellow');
				}}
			>
				yellow
			</button>
			<button
				style={{ background: 'black' }}
				onClick={() => {
					onColorChange('black');
				}}
			>
				black
			</button>
		</div>
	);
}

function Background({ color }) {
	return <div style={{ backgroundColor: color, height: '100vh' }}></div>;
}
export default App;
