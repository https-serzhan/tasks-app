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
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
					<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)]">
						<CardContent className="flex h-full flex-col justify-between p-8">
							<div>
								<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/10">
									<LockKeyhole className="size-5"/>
								</div>
								<h1 className="text-3xl font-semibold tracking-tight">Вход в приложение</h1>
								<p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
									Экран авторизации должен выглядеть как часть продукта, а не как учебная форма. Здесь только нужные действия и понятные демо-учетки.
								</p>
							</div>
							<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
								{[
									{title: "User access", value: "user@example.com", icon: BadgeCheck},
									{title: "Admin access", value: "admin@example.com", icon: ShieldCheck},
								].map((item) => (
									<div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
										<div className="flex items-center gap-2 text-sm font-medium text-slate-200">
											<item.icon className="size-4"/>
											<span>{item.title}</span>
										</div>
										<p className="mt-2 text-sm text-slate-300">{item.value}</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardHeader className="border-b border-slate-200 pb-5">
							<CardTitle className="text-2xl">Sign in</CardTitle>
							<CardDescription>Введите email и пароль для входа.</CardDescription>
						</CardHeader>
						<CardContent className="p-6">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-700" htmlFor="sign-in-email">Email</label>
									<Input id="sign-in-email" name='email' autoComplete='off' type="email" placeholder="user@example.com" className="h-11 rounded-lg border-slate-200 bg-white"/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-700" htmlFor="sign-in-password">Password</label>
									<Input id="sign-in-password" name='password' autoComplete='off' type="password" placeholder="Password" className="h-11 rounded-lg border-slate-200 bg-white"/>
								</div>
								<Button type="submit" className="h-11 w-full rounded-lg bg-slate-900 text-white hover:bg-slate-800">
									Войти
									<ArrowRight className="ml-2 size-4"/>
								</Button>
							</form>

							<div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
								Нет аккаунта?{" "}
								<NavLink to="/sign-up" className="font-medium text-slate-950">
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
