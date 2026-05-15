import {NavLink} from "react-router";
import type {FormEvent} from "react";
import {ArrowRight, ShieldPlus, Sparkles, UserPlus} from "lucide-react";
import {useUserStore} from "../store/user/hooks.ts";
import type {SignUpFormValuesType} from "../types/user.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";

const SignUpPage = () => {
	const {sign_up} = useUserStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: SignUpFormValuesType = Object.fromEntries(formData.entries()) as SignUpFormValuesType;
		await sign_up(data)
	}

	return (
			<div className="page-shell">
				<section className="auth-layout">
					<Card className="panel">
						<CardHeader className="panel__header">
							<CardTitle className="panel__title panel__title--sm">Create account</CardTitle>
							<CardDescription>Создайте демо-профиль пользователя или администратора.</CardDescription>
						</CardHeader>
						<CardContent className="panel__content">
							<form onSubmit={handleSubmit} className="form-stack">
								<div className="form-group">
									<label className="form-label" htmlFor="sign-up-name">Name</label>
									<Input id="sign-up-name" name='name' autoComplete='off' type="text" placeholder="Name" className="form-input"/>
								</div>
								<div className="form-group">
									<label className="form-label" htmlFor="sign-up-email">Email</label>
									<Input id="sign-up-email" name='email' autoComplete='off' type="email" placeholder="admin@example.com" className="form-input"/>
								</div>
								<div className="form-group">
									<label className="form-label" htmlFor="sign-up-password">Password</label>
									<Input id="sign-up-password" name='password' autoComplete='off' type="password" placeholder="Password" className="form-input"/>
								</div>
								<Button type="submit" className="app-button-primary app-button-block">
									Зарегистрироваться
									<ArrowRight className="link-icon"/>
								</Button>
							</form>

							<div className="auth-footer">
								Есть аккаунт?{" "}
								<NavLink to="/sign-in">
									Войти
								</NavLink>
							</div>
						</CardContent>
					</Card>

					<Card className="panel panel--dark">
						<CardContent className="panel__content panel__content--lg">
							<div>
								<div className="icon-box icon-box--dark">
									<UserPlus className="app-brand__icon"/>
								</div>
								<h1 className="panel__title panel__title--light">Регистрация</h1>
								<p className="panel__description panel__description--dark">
									Эта часть тоже должна выглядеть как продукт. Поэтому здесь тот же визуальный ритм, что и в основном приложении: строгие блоки, короткий текст, понятные сценарии.
								</p>
							</div>
							<div className="auth-note-grid">
								{[
									{title: "Email with user", value: "Создает стандартного пользователя", icon: Sparkles},
									{title: "Email with admin", value: "Создает администратора", icon: ShieldPlus},
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
				</section>
			</div>
	);
};

export default SignUpPage;
