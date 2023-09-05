import cn from 'classnames';

import { IButtonProps } from './Button.props';

import styles from './Button.module.css';

const Button = ({ children, className, appearance = 'small', ...props }: IButtonProps) => {
	return (
		<button
			className={cn(styles['button'], styles['accent'], className, {
				[styles['small']]: appearance === 'small',
				[styles['big']]: appearance === 'big',
			})}
			{...props}
		>
			{children}
		</button>
	);
};
export default Button;
