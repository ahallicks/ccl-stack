import type { MetaFunction, LoaderFunction } from '@remix-run/node';

import { Link, useLoaderData } from '@remix-run/react';

import { ExampleCounter } from '~/components/organisms/example-counter';

export const meta: MetaFunction = () => ({
	title: 'A Test Counter/API Component',
});

type TLoaderData = {
	pokemon: {
		name: string;
		species: {
			name: string;
			url: string;
		};
		type: string;
		height: number;
	};
	pokemons: [{
		name: string;
		url: string;
	}];
};

export const loader: LoaderFunction = async (): Promise<TLoaderData> => {
	try {
		const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
		const pokeResponse = await pokeRes.json();

		// Here we can filter the data from the API to only return what
		// we need for the front end
		const pokemon = {
			name: pokeResponse.name,
			species: {
				name: pokeResponse.species.name,
				url: pokeResponse.species.url,
			},
			type: pokeResponse.types[0].type.name,
			height: pokeResponse.height,
		};

		const monsRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`);
		const monsResponse = await monsRes.json();

		// Filter the data to only the 5 we need
		const allMons = monsResponse.results.length;
		const randMons = Math.floor(Math.random() * allMons);
		const startMons = randMons < 5 ? 5 : randMons;
		const pokemons = monsResponse.results.slice(startMons - 5, startMons);

		return {
			pokemon,
			pokemons
		};
	}
	catch (e: any) {
		// If we get here this will be caught by the Error Boundary in root.tsx
		// unless you export one in this file
		throw new Error(e.message);
	}
};

export default function Test() {
	const { pokemon, pokemons } = useLoaderData<TLoaderData>();
	return (
		<main id="main">
			<h1>Here's a counter</h1>
			<ExampleCounter />

			<h2>Here's a Pokemon</h2>

			<ul>
				<li><strong>Name:</strong> {pokemon.name}</li>
				<li><strong>Species:</strong> <a href={pokemon.species.url} rel="external noopener">{pokemon.species.name}</a></li>
				<li><strong>Type:</strong> {pokemon.type}</li>
				<li><strong>height:</strong> {pokemon.height}</li>
			</ul>

			<p><strong>Tip:</strong> go to /pokemon/name to find stats on a different pokemon! Or try one of the following:</p>

			<ol>
				{pokemons.map(mon => <li key={mon.url}><Link to={`/pokemon/${mon.name}`}>{mon.name}</Link></li>)}
			</ol>

			<p>
				<Link to="/">Return home</Link>
			</p>
		</main>
	);
}
