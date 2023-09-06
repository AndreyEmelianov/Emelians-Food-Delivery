import Headling from '../../components/ui/Headling/Headling';
import Search from '../../components/ui/Search/Search';

import styles from './Menu.module.css';

export function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
		</>
	);
}
