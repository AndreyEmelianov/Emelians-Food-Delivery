import { useSelector } from 'react-redux';
import Headling from '../../components/ui/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { IProduct } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX_URL } from '../../helpers/API';

import styles from './Cart.module.css';

export function Cart() {
	const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);

	const getItem = async (id: number) => {
		const { data } = await axios.get<IProduct>(`${PREFIX_URL}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((item) => getItem(item.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Headling className={styles['headling']}>Корзина</Headling>
			{items.map((item) => {
				const product = cartProducts.find((product) => product.id === item.id);
				if (!product) {
					return;
				}

				return <CartItem count={item.count} {...product} />;
			})}
		</>
	);
}
