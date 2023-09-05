import cn from 'classnames';

import { IButtonProps } from './Button.props';

import styles from './Button.module.css';

const Button = ({ children, className, ...props }: IButtonProps) => {
	return (
		<button className={cn(styles['button'], styles['accent'], className)} {...props}>
			{children}
		</button>
	);
};
export default Button;
