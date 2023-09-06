import cn from 'classnames';

import { IHeadlingProps } from './Headling.props';

import styles from './Headling.module.css';

const Headling = ({ children, className, ...props }: IHeadlingProps) => {
	return (
		<h1 {...props} className={cn(styles['headling'], className)}>
			{children}
		</h1>
	);
};
export default Headling;
