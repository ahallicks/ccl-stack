import React from 'react';

// Use Button for semantic button or LinkButton for anchor

export enum ButtonVariant {
	Primary = 'primary',
	Secondary = 'secondary',
};

type TButtonShared = React.PropsWithChildren<{
	variant?: ButtonVariant;
}>;

export type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> &
	TButtonShared;
export type TLinkButton = TButtonShared;

export const Button: React.FC<TButton> = ({
	variant = ButtonVariant.Primary,
	children,
	type = 'button',
	...buttonAttributes
}) => {
	return (
		<button
			className={`button button--${variant}`}
			{...buttonAttributes}
			type={type}
		>
			{children}
		</button>
	);
};
