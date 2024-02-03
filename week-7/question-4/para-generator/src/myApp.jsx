import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { ParaContext } from './store/context';

function App() {
	const [count, setCount] = useState(0);
	const wordArray =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, rem voluptatum at ratione eos veniam, expedita vero culpa quaerat corporis libero rerum velit praesentium dignissimos eius qui soluta modi dolorem.  Assumenda mollitia culpa commodi reiciendis obcaecati? Porro placeat adipisci architecto beatae hic, nihil dolorum expedita ducimus deserunt doloremque perferendis praesentium iure, in id facere neque cumque similique aliquid temporibus voluptas?  Impedit placeat facere libero cupiditate nam veritatis iste perferendis cum, praesentium quam possimus autem commodi reiciendis animi qui, facilis corporis exercitationem omnis. Commodi quam error molestias sunt repellendus quo praesentium!  Perspiciatis animi sunt architecto, saepe excepturi nemo tempore commodi nesciunt consequatur, culpa ea quo fugiat hic nam minus. Atque, inventore quasi. Doloremque officia ipsam totam quidem necessitatibus animi cupiditate maiores.  Totam non blanditiis laudantium, perspiciatis mollitia possimus? Veniam quas doloribus hic ratione cupiditate, totam nam sed corrupti excepturi! Autem asperiores magni mollitia eligendi natus. Id fugiat quas nulla nemo recusandae?  Porro, iure labore ea nostrum tenetur minus. Rem neque reprehenderit officia deleniti beatae labore, nam eveniet, corporis veritatis sapiente consectetur voluptate molestias doloremque minima consequuntur dolore ad nisi modi maxime!  Eveniet qui nemo in deserunt natus, quis, sed nobis mollitia consectetur incidunt odio, veniam asperiores ullam quaerat. Sunt porro dicta laboriosam, tenetur accusantium saepe, possimus aperiam itaque earum fuga dolor!  Doloribus saepe magnam cumque ad rem aut, unde voluptas aspernatur dolore soluta aperiam necessitatibus inventore ab officia eaque libero vitae nobis, nostrum numquam corrupti voluptatem porro tempore! Mollitia, nemo laborum.  Nihil iure placeat accusamus nisi voluptates est, corrupti labore asperiores cum officia ipsam dolor commodi voluptatibus? Cum facilis eos minus, sint vero doloremque perferendis ipsam, numquam consequuntur, aliquam hic nostrum.  Eos mollitia dolore hic inventore assumenda amet officiis ipsum ab sapiente ut soluta voluptate iusto, libero perspiciatis ratione voluptatem omnis. Eum omnis est, voluptatibus doloribus neque dicta quibusdam atque dolorum.  Ab repellendus veritatis, aliquid soluta rerum ratione. Ad sint nesciunt quod, aperiam fugiat nemo eaque illum cum perferendis quaerat asperiores voluptas officia deserunt maiores voluptatem, accusantium omnis esse illo et?  Autem sint maiores minus, animi incidunt laudantium nulla ea aperiam veritatis quia voluptatum consectetur sit iste temporibus optio, odio voluptas, tenetur repellat hic perspiciatis. Accusamus ab quas incidunt magni odit.  Atque cum eius veritatis saepe dolorum et quasi beatae voluptatum laborum deleniti. Rerum saepe accusantium veniam aspernatur dignissimos debitis eaque praesentium deleniti consectetur ea animi nulla delectus, reprehenderit aperiam impedit!  Voluptates praesentium iure asperiores consequatur laborum sed veniam, et minima libero debitis blanditiis eum! Tempore sint alias libero, laudantium aperiam corrupti. Nisi odio commodi ut minus eius vero qui quas.  Ab, impedit! Dicta ipsa itaque nostrum fugiat, nesciunt repellat numquam provident architecto vel magni earum hic mollitia consequuntur assumenda, illo doloribus cum. Ipsa hic distinctio odio beatae ratione ad aut?  Minima eum quos animi commodi quasi illum eveniet nihil? Sint sed beatae rem itaque velit quia fuga, ab mollitia facilis nulla? Corporis laborum delectus rerum a earum aperiam voluptatem eligendi!  Voluptas molestias ullam neque laudantium, animi consectetur voluptatem, sunt veniam iusto itaque architecto nemo rerum, provident molestiae sit quo earum nobis tempora assumenda similique aut iste facere? Eligendi, magnam non.  Cumque temporibus necessitatibus ipsum cupiditate eos, itaque soluta, nam nihil blanditiis id debitis laborum tenetur reprehenderit beatae rem sequi minima quae laboriosam ducimus ratione maiores vero. Cupiditate explicabo dolore corporis!  Commodi iusto reprehenderit deleniti totam assumenda? Quisquam reiciendis sed fuga, commodi ipsam et assumenda voluptatibus sapiente eligendi facilis vel fugit ea cumque adipisci illum dolore consequatur totam itaque quam nostrum?  Voluptates eum amet non quam labore esse blanditiis repellat id iure enim qui, aspernatur numquam quibusdam natus asperiores aut voluptatem doloremque aliquam sunt. Tempore natus at quaerat excepturi vero. Explicabo?  ';

	return (
		<>
			<h1>Para generator</h1>
			<EnterNumber wordArray={wordArray} setCount={setCount}></EnterNumber>
		</>
	);
}

function EnterNumber({ wordArray, setCount }) {
	const count = useContext(ParaContext);
	// const inputRef = useRef();
	// useEffect(() => {
	// 	inputRef.current.focus();
	// }, []);

	const wordsSplitted = wordArray.split(' ').slice(0, count); // .join('');
	console.log(wordsSplitted);

	return (
		<>
			<input
				type="text"
				placeholder="Enter number of words"
				// ref={inputRef}
				onChange={(e) => {
					setCount(e.target.value);
				}}
			></input>
			{/* <button onClick={() => wordsSplitted}>Generate</button> */}
			<p>{wordsSplitted}</p>
		</>
	);
}

export default App;
