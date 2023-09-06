import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

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
					<NavLink
						to="/"
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles['active']]: isActive,
							})
						}
					>
						<img src="/menu-icon.svg" alt="Иконка меню" />
						Меню
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles['active']]: isActive,
							})
						}
					>
						<img src="/cart-icon.svg" alt="Иконка корзины" />
						Корзина
					</NavLink>
				</div>
				<Button className={styles['exit']}>
					<img src="/exit-icon.svg" alt="Иконка выхода" />
					Выход
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}
