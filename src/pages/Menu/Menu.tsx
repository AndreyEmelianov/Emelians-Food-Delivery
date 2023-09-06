import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Headling from '../../components/ui/Headling/Headling';
import Search from '../../components/ui/Search/Search';
import { PREFIX_URL } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';

import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);

	const getMenu = async () => {
		try {
			const { data } = await axios.get<IProduct[]>(`${PREFIX_URL}/products`);
			setProducts(data);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
			<div>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.ingredients.join(', ')}
						rating={product.rating}
						price={product.price}
						image={product.image}
					/>
				))}
			</div>
		</>
	);
}
