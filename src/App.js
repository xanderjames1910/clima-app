import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
	// State del Formulario
	const [busqueda, setBusqueda] = useState({
		ciudad: '',
		pais: '',
	});

	const [consultar, setConsultar] = useState(false);
	const [resultado, setResultado] = useState({});
	const [error, setError] = useState(false);

	const { ciudad, pais } = busqueda;

	useEffect(() => {
		const consultarAPI = async () => {
			if (consultar) {
				const appId = 'd832d96e21137180a0900c30a98c0fd0';
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

				const respuesta = await fetch(url);
				const res = await respuesta.json();

				setResultado(res);
				setConsultar(false);

				// Detecta si hubo resultados crrectos en la consulta
				if (res.cod === '404') {
					setError(true);
				} else {
					setError(false);
				}
			}
		};
		consultarAPI();
	}, [consultar, ciudad, pais]);

	let componente;

	if (error) {
		componente = <Error msg='Np hay resultados' />;
	} else {
		componente = <Clima resultado={resultado} />;
	}

	return (
		<>
			<Header titulo='Clima React App' />

			<div className='contenedor-form'>
				<div className='container'>
					<div className='row'>
						<div className='col m6 s12'>
							<Formulario
								busqueda={busqueda}
								setBusqueda={setBusqueda}
								setConsultar={setConsultar}
							/>
						</div>
						<div className='col m6 s12'>{componente}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
