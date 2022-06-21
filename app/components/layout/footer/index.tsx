import { Link } from '@remix-run/react';

export const Footer = () => {
	return (
		<footer className="footer">
			<nav>
				<Link to="/">Home</Link> | <Link to="/test">Test</Link>
			</nav>
		</footer>
	);
};
