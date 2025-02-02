/**
 * .server. files will only ever run on the server so be careful
 * you don't accidentally try to use them in client-side code!
 * 
 * Most of the stuff in here isn't really needed if you don't need session
 * data but I've left it in as an example of how to use it.
 */

import { createCookieSessionStorage, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__session',
		httpOnly: true,
		maxAge: 0,
		path: '/',
		sameSite: 'lax',
		secrets: [process.env.SESSION_SECRET],
		secure: process.env.NODE_ENV === 'production',
	},
});

const USER_SESSION_KEY = 'userId';

export async function getSession(request: Request) {
	const cookie = request.headers.get('Cookie');
	return sessionStorage.getSession(cookie);
}

export async function createUserSession({
	request,
	userId,
	remember,
	redirectTo,
}: {
	request: Request;
	userId: string;
	remember: boolean;
	redirectTo: string;
}) {
	const session = await getSession(request);
	session.set(USER_SESSION_KEY, userId);
	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session, {
				maxAge: remember
				? 60 * 60 * 24 * 7 // 7 days
				: undefined,
			}),
		},
	});
}
