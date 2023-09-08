import { useSelector } from 'react-redux';
import Headling from '../../components/ui/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { IProduct } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX_URL } from '../../helpers/API';

import styles from './Cart.module.css';
import Button from '../../components/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

const DELIVERY_FEE = 170;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
	const items = useSelector((state: RootState) => state.cart.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);

	const navigate = useNavigate();

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

	const checkout = async () => {
		await axios.post(
			`${PREFIX_URL}/order`,
			{
				products: items,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		navigate('/success');
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
				<div className={styles['text']}>
					Итог <span>({items.length})</span>
				</div>
				<div className={styles['price']}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>

			<div className={styles['checkout-line']}>
				<Button appearance="big" onClick={checkout}>
					Оформить
				</Button>
			</div>
		</>
	);
}
