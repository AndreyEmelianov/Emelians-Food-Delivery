import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import Headling from '../../components/ui/Headling/Headling';
import Input from '../../components/ui/Input/Input';

import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { register, userActions } from '../../store/user.slice';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		dispatch(register({ email: email.value, password: password.value, name: name.value }));
	};

	return ( 
		<div className={styles['register']}>
			<Headling>Регистрация</Headling>
			{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" placeholder="Email" name="email" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input id="password" placeholder="Пароль" type="password" name="password" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" placeholder="Имя" name="name" />
				</div>
				<Button appearance="big">Зарегестрироваться</Button>
			</form>
			<div className={styles['links']}>
				<div>Есть аккаунт?</div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
	);
}
