import { useSelector } from 'react-redux';
import Headling from '../../components/ui/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { IProduct } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX_URL } from '../../helpers/API';

import styles from './Cart.module.css';

const DELIVERY_FEE = 170;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);

	const total = items
		.map((item) => {
			const product = cartProducts.find((product) => product.id === item.id);
			if (!product) {
				return 0;
			}

			return item.count * product.price;
		})
		.reduce((acc, item) => (acc += item), 0);

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

				return <CartItem key={product.id} count={item.count} {...product} />;
			})}

			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>
					{DELIVERY_FEE}&nbsp;
					<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Итог {items.length}</div>
				<div className={styles['price']}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
		</>
	);
}
