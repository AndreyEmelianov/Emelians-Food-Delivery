import ProductCard from '../../../components/ProductCard/ProductCard';
import { IMenuListProps } from './MenuList.props';

export function MenuList({ products }: IMenuListProps) {
	return products.map((product) => (
		<ProductCard
			key={product.id}
			id={product.id}
			name={product.name}
			description={product.ingredients.join(', ')}
			rating={product.rating}
			price={product.price}
			image={product.image}
		/>
	));
}
