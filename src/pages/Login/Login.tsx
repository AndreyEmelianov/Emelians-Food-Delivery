import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import Headling from '../../components/ui/Headling/Headling';
import Input from '../../components/ui/Input/Input';

import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {
	const submit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className={styles['login']} onSubmit={submit}>
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
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to="/auth/register">Зарегестрироваться</Link>
			</div>
		</div>
	);
}
