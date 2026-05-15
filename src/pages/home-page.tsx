import {useUserStore} from "../store/user/hooks.ts";
import {Link} from "react-router";
import {ArrowRight, CheckCheck, ListTodo, ShieldCheck, UserRound} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

const HomePage = () => {
	const {user} = useUserStore();

	if (!user) {
		return (
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
					<section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
						<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
							<CardContent className="p-8 sm:p-10">
								<div className="mb-4 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
									Styled Todo
								</div>
								<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
									Собранный TODO app на базе учебного проекта.
								</h1>
								<p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
									Интерфейс пересобран под рабочий сценарий: авторизация, список задач, посты и профиль в одной структуре.
								</p>
								<div className="mt-8 flex flex-wrap gap-3">
									<Button asChild className="h-11 rounded-lg bg-slate-900 px-5 text-white hover:bg-slate-800">
										<Link to="/sign-in">
											Войти
											<ArrowRight className="ml-2 size-4"/>
										</Link>
									</Button>
									<Button asChild variant="outline" className="h-11 rounded-lg px-5">
										<Link to="/sign-up">Создать аккаунт</Link>
									</Button>
								</div>
							</CardContent>
						</Card>

						<div className="grid gap-4">
							{[
								{icon: ListTodo, title: "Todo board", description: "Создание, редактирование, удаление и пагинация задач."},
								{icon: ShieldCheck, title: "Auth flow", description: "Демо-вход для user/admin и локальное хранение профиля."},
								{icon: CheckCheck, title: "Posts & profile", description: "Дополнительные страницы сохранены из учебной структуры."},
							].map((item) => (
								<Card key={item.title} className="rounded-xl border-slate-200 bg-white shadow-none">
									<CardContent className="flex gap-4 p-5">
										<div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
											<item.icon className="size-5 text-slate-700"/>
										</div>
										<div>
											<h2 className="text-base font-semibold text-slate-950">{item.title}</h2>
											<p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</section>
				</div>
		);
	}

	return (
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardContent className="p-8">
							<div className="flex items-center gap-3">
								<div className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
									<UserRound className="size-5 text-slate-700"/>
								</div>
								<div>
									<p className="text-sm text-slate-500">Рабочая зона</p>
									<h1 className="text-2xl font-semibold text-slate-950">Здравствуйте, {user.name}</h1>
								</div>
							</div>
							<p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
								Это не лендинг. Это вход в приложение. Основной сценарий здесь - быстро перейти к задачам, постам или профилю без лишнего текста и пустых блоков.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<Button asChild className="h-11 rounded-lg bg-slate-900 px-5 text-white hover:bg-slate-800">
									<Link to="/todos">
										Открыть задачи
										<ArrowRight className="ml-2 size-4"/>
									</Link>
								</Button>
								<Button asChild variant="outline" className="h-11 rounded-lg px-5">
									<Link to="/posts">Открыть посты</Link>
								</Button>
								<Button asChild variant="outline" className="h-11 rounded-lg px-5">
									<Link to="/profile">Профиль</Link>
								</Button>
							</div>
						</CardContent>
					</Card>

					<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
						{[
							{
								title: "Todo board",
								description: "Основной экран для работы со списком задач.",
								icon: ListTodo,
								link: "/todos",
							},
							{
								title: "Posts",
								description: "Поиск, просмотр и навигация по постам.",
								icon: CheckCheck,
								link: "/posts",
							},
							{
								title: "Profile",
								description: "Локальное обновление имени и аватара.",
								icon: ShieldCheck,
								link: "/profile",
							},
						].map((item) => (
							<Card key={item.title} className="rounded-xl border-slate-200 bg-white shadow-none">
								<CardContent className="p-5">
									<div className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
										<item.icon className="size-4 text-slate-700"/>
									</div>
									<h2 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h2>
									<p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
									<Link to={item.link} className="mt-4 inline-flex items-center text-sm font-medium text-slate-950">
										Открыть
										<ArrowRight className="ml-2 size-4"/>
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			</div>
	);
};

export default HomePage;
