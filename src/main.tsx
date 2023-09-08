import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import { PREFIX_URL } from './helpers/API.ts';
import axios from 'axios';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/success',
				element: <Success />,
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Произошла ошибка ...</>,
				loader: async ({ params }) => {
					return defer({
						data: axios
							.get(`${PREFIX_URL}/products/${params.id}`)
							.then((data) => data)
							.catch((e) => e),
					});
				},
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
