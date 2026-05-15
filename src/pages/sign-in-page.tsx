import {NavLink} from "react-router";
import type {FormEvent} from "react";
import {ArrowRight, BadgeCheck, LockKeyhole, ShieldCheck} from "lucide-react";
import {useUserStore} from "../store/user/hooks.ts";
import type {SignInFormValuesType} from "../types/user.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";

const SignInPage = () => {
	const {sign_in} = useUserStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: SignInFormValuesType = Object.fromEntries(formData.entries()) as SignInFormValuesType;
		await sign_in(data)
	}

	return (
			<div className="page-shell">
				<section className="auth-layout">
					<Card className="panel panel--dark">
						<CardContent className="panel__content panel__content--lg">
							<div>
								<div className="icon-box icon-box--dark">
									<LockKeyhole className="app-brand__icon"/>
								</div>
								<h1 className="panel__title panel__title--light">Вход в приложение</h1>
								<p className="panel__description panel__description--dark">
									Экран авторизации должен выглядеть как часть продукта, а не как учебная форма. Здесь только нужные действия и понятные демо-учетки.
								</p>
							</div>
							<div className="auth-note-grid">
								{[
									{title: "User access", value: "user@example.com", icon: BadgeCheck},
									{title: "Admin access", value: "admin@example.com", icon: ShieldCheck},
								].map((item) => (
									<div key={item.title} className="auth-note">
										<div className="auth-note__title">
											<item.icon className="app-brand__icon"/>
											<span>{item.title}</span>
										</div>
										<p className="auth-note__text">{item.value}</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="panel">
						<CardHeader className="panel__header">
							<CardTitle className="panel__title panel__title--sm">Sign in</CardTitle>
							<CardDescription>Введите email и пароль для входа.</CardDescription>
						</CardHeader>
						<CardContent className="panel__content">
							<form onSubmit={handleSubmit} className="form-stack">
								<div className="form-group">
									<label className="form-label" htmlFor="sign-in-email">Email</label>
									<Input id="sign-in-email" name='email' autoComplete='off' type="email" placeholder="user@example.com" className="form-input"/>
								</div>
								<div className="form-group">
									<label className="form-label" htmlFor="sign-in-password">Password</label>
									<Input id="sign-in-password" name='password' autoComplete='off' type="password" placeholder="Password" className="form-input"/>
								</div>
								<Button type="submit" className="app-button-primary app-button-block">
									Войти
									<ArrowRight className="link-icon"/>
								</Button>
							</form>

							<div className="auth-footer">
								Нет аккаунта?{" "}
								<NavLink to="/sign-up">
									Зарегистрироваться
								</NavLink>
							</div>
						</CardContent>
					</Card>
				</section>
			</div>
	);
};

export default SignInPage;
