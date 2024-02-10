import { useRef, useState } from 'react';
import './App.css';

function App() {
  function verifiedOtp(){
    alert("Otp is verified")
  }
	function otpVerification({ numberOfDigits }) {
		const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''));
		const otpRef = useRef();
    return (
      <>
      <div>
				<h2>Login via OTP</h2>
				<button onClick={verifiedOtp}>Verify OTP</button>
      </div>
      </>
    )
	}

	return (
		<>
			<div>
				<h2>Login via OTP</h2>
				<input type="text" placeholder="Enter your number" />
				<button onClick={otpVerification}>Send OTP</button>
			</div>
		</>
	);
}

export default App;
