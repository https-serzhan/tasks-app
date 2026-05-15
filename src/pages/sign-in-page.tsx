import {useUserStore} from "../store/user/hooks.ts";
import type {SignInFormValuesType} from "../types/user.ts";
import {NavLink} from "react-router";
import type {FormEvent} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {BadgeCheck, LockKeyhole} from "lucide-react";

const SignInPage = () => {
	const {sign_in} = useUserStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: SignInFormValuesType = Object.fromEntries(formData.entries()) as SignInFormValuesType;
		await sign_in(data)
	}

	return (
			<div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
				<Card className="mx-auto w-full max-w-md border-white/70 bg-white/85 shadow-[0_24px_60px_-30px_rgba(30,41,59,0.4)]">
					<CardHeader className="space-y-4">
						<div className="inline-flex w-fit rounded-2xl bg-slate-950 p-3 text-white">
							<LockKeyhole className="size-5"/>
						</div>
						<div className="space-y-2">
							<CardTitle className="text-3xl">Вход</CardTitle>
							<CardDescription>
								Для демо используйте email с `user` или `admin`.
							</CardDescription>
						</div>
						<div className="flex flex-wrap gap-2 text-xs">
							<span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">user@example.com</span>
							<span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">admin@example.com</span>
						</div>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input name='email' autoComplete='off' type="email" placeholder="Email" className="h-11"/>
							<Input name='password' autoComplete='off' type="password" placeholder="Password" className="h-11"/>
							<Button type="submit" className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800">
								<BadgeCheck className="mr-2 size-4"/>
								Войти
							</Button>
						</form>

						<p className="mt-6 text-sm text-slate-500">
							Нет аккаунта?{" "}
							<NavLink to="/sign-up" className="font-medium text-slate-950 underline underline-offset-4">
								Зарегистрироваться
							</NavLink>
						</p>
					</CardContent>
				</Card>
			</div>
	);
};

export default SignInPage;
