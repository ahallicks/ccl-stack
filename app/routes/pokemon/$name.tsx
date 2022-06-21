import type { MetaFunction, LoaderFunction } from '@remix-run/node';

import { Link, useLoaderData } from '@remix-run/react';

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
	} | null;
};

export const loader: LoaderFunction = async ({ params }): Promise<TLoaderData> => {
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
		const response = await res.json();
		// Here we can fiulter the data from the API to only return what
		// we need for the front end
		const pokemon = {
			name: response.name,
			species: {
				name: response.species.name,
				url: response.species.url,
			},
			type: response.types[0].type.name,
			height: response.height,
		};
		return {
			pokemon
		};
	}
	catch (e: any) {
		return {
			pokemon: null
		};
	}
};

export default function Pokemon() {
	const { pokemon } = useLoaderData<TLoaderData>();
	return (
		<main id="main">
			{!pokemon ? <>
				<h1>Pokemon not found!</h1>
				<p>That Pokemon does not exist</p>
			</> : <>
				<h1>Here's the details for {pokemon.name}</h1>

				<ul>
					<li><strong>Name:</strong> {pokemon.name}</li>
					<li><strong>Species:</strong> <a href={pokemon.species.url} rel="external noopener">{pokemon.species.name}</a></li>
					<li><strong>Type:</strong> {pokemon.type}</li>
					<li><strong>height:</strong> {pokemon.height}</li>
				</ul>
				<p>
					<Link to="/">Return home</Link>
				</p>
			</>}
		</main>
	);
}
