import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import Headling from '../../components/ui/Headling/Headling';
import Input from '../../components/ui/Input/Input';

import styles from './Login.module.css';

export function Login() {
	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			<form className={styles['form']}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" placeholder="Email" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" placeholder="Пароль" type="password" />
				</div>
				<Button appearance="big">Вход</Button>
				<div>Нет аккаунта?</div>
				<div>
					<Link to="/auth/register">Зарегестрироваться</Link>
				</div>
			</form>
		</div>
	);
}
