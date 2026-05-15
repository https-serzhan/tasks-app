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
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardHeader className="border-b border-slate-200 pb-5">
							<CardTitle className="text-2xl">Create account</CardTitle>
							<CardDescription>Создайте демо-профиль пользователя или администратора.</CardDescription>
						</CardHeader>
						<CardContent className="p-6">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-700" htmlFor="sign-up-name">Name</label>
									<Input id="sign-up-name" name='name' autoComplete='off' type="text" placeholder="Name" className="h-11 rounded-lg border-slate-200 bg-white"/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-700" htmlFor="sign-up-email">Email</label>
									<Input id="sign-up-email" name='email' autoComplete='off' type="email" placeholder="admin@example.com" className="h-11 rounded-lg border-slate-200 bg-white"/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-slate-700" htmlFor="sign-up-password">Password</label>
									<Input id="sign-up-password" name='password' autoComplete='off' type="password" placeholder="Password" className="h-11 rounded-lg border-slate-200 bg-white"/>
								</div>
								<Button type="submit" className="h-11 w-full rounded-lg bg-slate-900 text-white hover:bg-slate-800">
									Зарегистрироваться
									<ArrowRight className="ml-2 size-4"/>
								</Button>
							</form>

							<div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
								Есть аккаунт?{" "}
								<NavLink to="/sign-in" className="font-medium text-slate-950">
									Войти
								</NavLink>
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)]">
						<CardContent className="flex h-full flex-col justify-between p-8">
							<div>
								<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/10">
									<UserPlus className="size-5"/>
								</div>
								<h1 className="text-3xl font-semibold tracking-tight">Регистрация</h1>
								<p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
									Эта часть тоже должна выглядеть как продукт. Поэтому здесь тот же визуальный ритм, что и в основном приложении: строгие блоки, короткий текст, понятные сценарии.
								</p>
							</div>
							<div className="grid gap-3">
								{[
									{title: "Email with user", value: "Создает стандартного пользователя", icon: Sparkles},
									{title: "Email with admin", value: "Создает администратора", icon: ShieldPlus},
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
				</section>
			</div>
	);
};

export default SignUpPage;
