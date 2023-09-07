import styles from './CartItem.module.css';
import { ICartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';

function CartItem({ id, name, image, price, count }: ICartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.addToCart(id));
	};

	const decrease = () => {};

	const remove = () => {};

	return (
		<div className={styles['cart-item']}>
			<div className={styles['image']} style={{ backgroundImage: `url('${image}')` }}></div>

			<div className={styles['description']}>
				<div className={styles['name']}>{name}</div>
				<div className={styles['currency']}>{price}&nbsp;₽</div>
			</div>

			<div className={styles['actions']}>
				<button className={styles['button']} onClick={decrease}>
					<img src="/cart-button-icon.svg" alt="Удалить товар" />
				</button>
				<div>{count}</div>
				<button className={styles['button']} onClick={increase}>
					<img src="/cart-button-icon.svg" alt="Добавить товар" />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src="/cart-button-icon.svg" alt="Удалить всё" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
