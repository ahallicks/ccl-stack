import { installGlobals } from '@remix-run/node/globals';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

declare global {
	var IS_REACT_ACT_ENVIRONMENT: boolean;
}

// In your test setup file
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

installGlobals();
