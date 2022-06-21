import type {
	LinksFunction,
	MetaFunction,
} from '@remix-run/node';

import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';

import { Header } from '~/components/layout/header';
import { Footer } from '~/components/layout/footer';

import styleSheet from './styles/global.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styleSheet }];
};

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Code Computerlove Stack',
	viewport: 'width=device-width,initial-scale=1',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<head>
				<Meta />
				{/*
					Provide custom font files inline if possible to not require CSS to download and parse
					before showing fonts
					<style dangerouslySetInnerHTML={{ __html: `@font-face {font-display: swap;font-family: 'Poppins';font-style: normal;font-weight: 300;src: local('Poppins'),url('/font/poppins/poppins-v20-latin-300.woff2') format('woff2'),url('/font/poppins/poppins-v20-latin-300.woff') format('woff');}@font-face {font-display: swap;font-family: 'Poppins';font-style: normal;font-weight: 400;src: local('Poppins'),url('/font/poppins/poppins-v20-latin-regular.woff2') format('woff2'),url('/font/poppins/poppins-v20-latin-regular.woff') format('woff');}@font-face {font-display: swap;font-family: 'Poppins';font-style: normal;font-weight: 500;src: local('Poppins'),url('/font/poppins/poppins-v20-latin-500.woff2') format('woff2'),url('/font/poppins/poppins-v20-latin-500.woff') format('woff');}` }}/>
				*/}
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
				{process.env.NODE_ENV === 'development' ? <>
					<script src="/script/axe.min.js" defer></script>
					<script src="/script/run-axe.js" defer></script>
				</> : null}
			</body>
		</html>
	);
};

function Document({ children }: { children: React.ReactNode }) {
	return (
		<Layout>
			<Header />
			{children}
			<Footer />
		</Layout>
	);
}

/**
 * Here you can wrap any providers you might need
 * around the <Outlet/>
 */
export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export const ErrorBoundary = ({ error }: { error: Error; }) => {
	return (
		<html lang="en">
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				<main id="main">
					<h1>There was an error</h1>
					<p>{error.message}</p>
					<Scripts />
					<LiveReload />
				</main>
				<Footer />
			</body>
		</html>
	);
}
