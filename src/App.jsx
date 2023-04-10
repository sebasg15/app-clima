import {useState} from 'react';

function App() {
	const [location, setLocation] = useState('');
	const [weather, setWeather] = useState('null');

	function handleClick() {
		fetch(`http://api.weatherapi.com/v1/current.json?key=39b4ca0a7ef0490296435419230702&q=${location}&aqi=no`)
			.then((res) => res.json())
			.then((data) => setWeather(data));
	}

	function handleChange(e) {
		if (e.target.value !== '') {
			setLocation(e.target.value);
		}
	}
	let newDate, hour;
	if (weather.location) {
		const date = new Date(weather.location.localtime);
		newDate = date.toLocaleDateString({year: 'numeric', month: 'long', day: 'numeric'});
		hour = date.toLocaleTimeString('es-ES', {hour: 'numeric', minute: 'numeric', hour12: true});
	}

	return (
		<main className='flex flex-col items-center'>
			<div className='flex mx-auto mt-20 mb-6'>
				<input type='text' onChange={handleChange} className='border border-slate-900 text-2xl text-center ' />
				<button type='button' onClick={handleClick} className='border border-teal-400 rounded bg-slate-300 hover:bg-cyan-600 hover:text-white'>
					buscar
				</button>
			</div>

			{weather.location && weather.current && (
				<>
					<h1 className='text-7xl mt-3 mb-6'>{weather.location.name}</h1>
					<div className='grid grid-cols-2 w-1/3 items-center justify-items-center'>
						<div className=' flex flex-col items-center'>
							<h1 className='text-6xl pb-4'>{weather.current.temp_c}°</h1>
							<p className='text-xl'>{newDate}</p>
							<p>{hour}</p>
						</div>
						<div className='flex flex-col items-center'>
							<img src={`http:${weather.current.condition.icon}`} width={120}></img>
							<p className=' relative text-lg bottom-3 '>{weather.current.condition.text}</p>
						</div>
					</div>
				</>
			)}
			<h1 className='text-center text-5xl mt-14 font-mono w-3/5'>Conoce como está el clima de cualquier ciudad </h1>
		</main>
	);
}
export default App;
