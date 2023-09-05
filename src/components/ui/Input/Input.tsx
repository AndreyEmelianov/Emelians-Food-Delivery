import cn from 'classnames';

import styles from './Input.module.css';
import { forwardRef } from 'react';
import { IInputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
	{ className, isValid = true, ...props },
	ref
) {
	return (
		<input
			ref={ref}
			className={cn(styles['input'], className, {
				[styles['invalid']]: isValid,
			})}
			{...props}
		/>
	);
});
export default Input;
