import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/ui/Headling/Headling';
import Search from '../../components/ui/Search/Search';
import { PREFIX_URL } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';

import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>('');
	const [filter, setFilter] = useState<string>('');

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX_URL}/products`, {
				params: {
					name,
				},
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" value={filter} onChange={updateFilter} />
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
				{isLoading && <>Идёт загрузка меню...</>}
			</div>
		</>
	);
}

export default Menu;
