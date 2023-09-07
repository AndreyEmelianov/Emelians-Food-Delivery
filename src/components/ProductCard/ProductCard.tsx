import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { IProductCardProps } from './ProductCard.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';

function ProductCard({ id, name, description, image, price, rating }: IProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const addToCart = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.addToCart(id));
	};

	return (
		<Link to={`/product/${id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{ backgroundImage: `url('${image}')` }}>
					<div className={styles['price']}>
						{price} &nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={addToCart}>
						<img src="/cart-button-icon.svg" alt="Добавить в корзину" />
					</button>
					<div className={styles['rating']}>
						{rating} &nbsp;
						<img src="/star-icon.svg" alt="Иконка рейтинга" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{name}</div>
					<div className={styles['description']}>{description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
