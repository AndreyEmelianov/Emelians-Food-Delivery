import styles from './ProductCard.module.css';
import { IProductCardProps } from './ProductCard.props';

function ProductCard({ id, title, description, image, price, rating }: IProductCardProps) {
	return (
		<div className={styles['card']}>
			<div className={styles['head']}>
				<div className={styles['price']}>
					{price}
					<span className={styles['currency']}>₽</span>
				</div>
				<button className={styles['add-to-cart']}>
					<img src="/cart-button-icon.svg" alt="Добавить в корзину" />
				</button>
				<div className={styles['rating']}>
					{rating}
					<img src="/star-icon.svg" alt="Иконка рейтинга" />
				</div>
			</div>
			<div className={styles['footer']}>
				<div className={styles['title']}>{title}</div>
				<div className={styles['description']}>{description}</div>
			</div>
		</div>
	);
}

export default ProductCard;
