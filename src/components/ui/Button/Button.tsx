import './Button.css';
import { IButtonProps } from './Button.props';
import cn from 'classnames';

const Button = ({ children, className, ...props }: IButtonProps) => {
	return (
		<button className={cn('button accent', className)} {...props}>
			{children}
		</button>
	);
};
export default Button;
