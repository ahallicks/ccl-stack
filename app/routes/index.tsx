import { Link } from '@remix-run/react';

import { useOptionalUser } from '~/utils';

export default function Index() {
	const user = useOptionalUser();
	return (
		<main id="main">
			{user ? <Link to="logout">Logout</Link> : <>
				<Link to="login">Login</Link>
				<Link to="join">Join</Link>
			</>}
		</main>
	);
}
