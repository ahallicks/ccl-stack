import { useState } from 'react';
import { Button } from '~/components/atoms/button';

export const ExampleCounter = () => {
	const [count, setCount] = useState(0);
	return (
		<div className="counter">
			<Button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Increment
			</Button>
			<div>
				Current count: <span className="value">{count}</span>
			</div>
		</div>
	);
};
