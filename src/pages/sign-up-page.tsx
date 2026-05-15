import {NavLink} from "react-router";
import {useUserStore} from "../store/user/hooks.ts";
import type {FormEvent} from "react";
import type {SignUpFormValuesType} from "../types/user.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {UserPlus} from "lucide-react";

const SignUpPage = () => {
	const {sign_up} = useUserStore();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: SignUpFormValuesType = Object.fromEntries(formData.entries()) as SignUpFormValuesType;
		await sign_up(data)
	}
	return (
			<div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
				<Card className="mx-auto w-full max-w-md border-white/70 bg-white/85 shadow-[0_24px_60px_-30px_rgba(30,41,59,0.4)]">
					<CardHeader className="space-y-4">
						<div className="inline-flex w-fit rounded-2xl bg-indigo-600 p-3 text-white">
							<UserPlus className="size-5"/>
						</div>
						<div className="space-y-2">
							<CardTitle className="text-3xl">Регистрация</CardTitle>
							<CardDescription>
								Email с `user` или `admin` создаст демо-профиль.
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input name='name' autoComplete='off' type="text" placeholder="Name" className="h-11"/>
							<Input name='email' autoComplete='off' type="email" placeholder="Email" className="h-11"/>
							<Input name='password' autoComplete='off' type="password" placeholder="Password" className="h-11"/>
							<Button type="submit" className="h-11 w-full bg-slate-950 text-white hover:bg-slate-800">
								Зарегистрироваться
							</Button>
						</form>

						<p className="mt-6 text-sm text-slate-500">
							Есть аккаунт?{" "}
							<NavLink to="/sign-in" className="font-medium text-slate-950 underline underline-offset-4">
								Войти
							</NavLink>
						</p>
					</CardContent>
				</Card>
			</div>
	);
};

export default SignUpPage;
