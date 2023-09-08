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

	const decrease = () => {
		dispatch(cartActions.removeCartItem(id));
	};

	const remove = () => {
		dispatch(cartActions.deleteItemFromCart(id));
	};

	return (
		<div className={styles['cart-item']}>
			<div className={styles['image']} style={{ backgroundImage: `url('${image}')` }}></div>

			<div className={styles['description']}>
				<div className={styles['name']}>{name}</div>
				<div className={styles['price']}>{price}&nbsp;₽</div>
			</div>

			<div className={styles['actions']}>
				<button className={styles['decr']} onClick={decrease}>
					<img src="/decrement-icon.svg" alt="Удалить товар" />
				</button>
				<div className={styles['counter']}>{count}</div>
				<button className={styles['incr']} onClick={increase}>
					<img src="/increment-icon.svg" alt="Добавить товар" />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src="/delete-icon.svg" alt="Удалить всё" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
