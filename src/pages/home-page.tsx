import {useUserStore} from "../store/user/hooks.ts";
import {Link} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {ArrowRight, CheckCheck, ListTodo, ShieldCheck} from "lucide-react";

const HomePage = () => {
	const {user} = useUserStore();
	return (
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
				<Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_24px_60px_-30px_rgba(30,41,59,0.35)]">
					<CardContent className="grid gap-8 p-8 lg:grid-cols-[1.4fr_0.9fr] lg:p-10">
						<div className="space-y-5">
							<div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
								Основа: lesson `l-31-40`
							</div>
							<div className="space-y-3">
								<h1 className="text-4xl font-semibold tracking-tight text-slate-950">Стилизованный TODO list на shadcn/ui</h1>
								<p className="max-w-2xl text-base leading-7 text-slate-600">
									Проект сохранен на базе учебного репозитория, но интерфейс полностью пересобран на `shadcn/ui` и Tailwind.
								</p>
							</div>
							<div className="flex flex-wrap gap-3">
								<Button asChild className="rounded-full bg-slate-950 text-white hover:bg-slate-800">
									<Link to={user ? "/todos" : "/sign-in"}>
										{user ? "Открыть задачи" : "Перейти ко входу"}
										<ArrowRight className="ml-2 size-4"/>
									</Link>
								</Button>
								{!user && (
										<Button asChild variant="outline" className="rounded-full">
											<Link to="/sign-up">Создать аккаунт</Link>
										</Button>
								)}
							</div>
							{user && (
									<p className="text-sm font-medium text-slate-500">
										Здравствуйте, {user.name}. Рабочая зона уже доступна.
									</p>
							)}
						</div>

						<div className="grid gap-4">
							{[
								{icon: ListTodo, title: "Todo board", description: "Список задач, редактирование, удаление и переключение статуса."},
								{icon: CheckCheck, title: "Progress view", description: "Счетчики активных и завершенных задач прямо в шапке раздела."},
								{icon: ShieldCheck, title: "Auth flow", description: "Вход, регистрация и профиль сохранены из учебной структуры."},
							].map((item) => (
								<div key={item.title} className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5">
									<div className="mb-4 inline-flex rounded-2xl bg-white p-3 shadow-sm">
										<item.icon className="size-5 text-slate-900"/>
									</div>
									<h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
									<p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
	);
};

export default HomePage;
