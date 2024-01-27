import { useEffect, useRef } from 'react';

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
	const Ref = useRef();

	useEffect(() => {
		Ref.current.focus();
	}, [Ref]);

	const handleButtonClick = () => {
		Ref.current.focus();
	};

	return (
		<div>
			<input ref={Ref} type="text" placeholder="Enter text here" />
			<button onClick={handleButtonClick}>Focus Input</button>
		</div>
	);
}
