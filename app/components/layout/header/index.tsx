import { Link } from '@remix-run/react';

export const Header = () => {
	return (
		<header className="header">
			<nav>
				<Link to="/">Home</Link> | <Link to="/test">Test</Link>
			</nav>
		</header>
	);
};
