import React from 'react';
import {postText} from './api/api';

function App() {
	const [result, setResult] = React.useState('');

	React.useEffect(() => {
		const request = postText('halowakgeng', 'JALANGANESHASEPULUH', 'playfair', 'encrypt', false);
		request.then((res) => {
			setResult(res)
		}).catch((err) => {
			console.log(err)
		});
	}, []);

	return (
		<div>
			<p>Hello World</p>
			<p>{result}</p>
		</div>
	);
}

export default App;
