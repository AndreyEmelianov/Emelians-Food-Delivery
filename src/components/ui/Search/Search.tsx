import cn from 'classnames';
import { forwardRef } from 'react';

import { ISearchProps } from './Search.props';

import styles from './Search.module.css';

const Search = forwardRef<HTMLInputElement, ISearchProps>(function Input(
	{ className, isValid = true, ...props },
	ref
) {
	return (
		<div className={styles['input-wrapper']}>
			<input
				ref={ref}
				className={cn(styles['search'], className, {
					[styles['invalid']]: isValid,
				})}
				{...props}
			/>
			<img className={styles['search-icon']} src="/search-icon.svg" alt="Иконка поиска" />
		</div>
	);
});
export default Search;
