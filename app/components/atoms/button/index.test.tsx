import { expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './index';

describe('atoms/button', () => {
	it('should render', () => {
		const click = vi.fn();
		render(<Button onClick={click}>Button</Button>);
		const btn = screen.getByText('Button');
		expect(btn).toBeInTheDocument();
		btn.click();
		expect(click).toBeCalledTimes(1);
	});
});
