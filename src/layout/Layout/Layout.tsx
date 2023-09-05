import { Link, Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import Button from '../../components/ui/Button/Button';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['avatar']} src="/avatar.png" alt="Аватар пользователя" />
					<div className={styles['name']}>Андрей Емельянов</div>
					<div className={styles['email']}>621077@mail.ru</div>
				</div>
				<div className={styles['menu']}>
					<Link to="/" className={styles['link']}>
						<img src="/menu-icon.svg" alt="Иконка меню" />
						Меню
					</Link>
					<Link to="/cart" className={styles['link']}>
						<img src="/cart-icon.svg" alt="Иконка корзины" />
						Корзина
					</Link>
				</div>
				<Button className={styles['exit']}>
					<img src="/exit-icon.svg" alt="Иконка выхода" />
					Выход
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
