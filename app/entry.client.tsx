import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import { hydrate } from 'react-dom';

// Cypress doesn't like React 18 yet!
declare global {
	var Cypress: any;
}

if (window.Cypress) {
	hydrate(<RemixBrowser />, document);
} else {
	hydrateRoot(document, <RemixBrowser />);
}
