import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import Headling from '../../components/ui/Headling/Headling';
import Input from '../../components/ui/Input/Input';

import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX_URL } from '../../helpers/API';
import { ILoginResponse } from '../../interfaces/auth.interface';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user.slice';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<ILoginResponse>(`${PREFIX_URL}/auth/login`, {
				email,
				password,
			});

			localStorage.setItem('jwt', data.access_token);
			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" placeholder="Email" name="email" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" placeholder="Пароль" type="password" name="password" />
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
