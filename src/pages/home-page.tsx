import {useUserStore} from "../store/user/hooks.ts";
import {Link} from "react-router";
import {ArrowRight, CheckCheck, ListTodo, ShieldCheck, UserRound} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

const HomePage = () => {
	const {user} = useUserStore();

	if (!user) {
		return (
				<div className="page-shell">
					<section className="home-layout home-layout--guest">
						<Card className="panel">
							<CardContent className="panel__content panel__content--lg">
								<div className="panel__eyebrow">Styled Todo</div>
								<h1 className="panel__title">
									Собранный TODO app на базе учебного проекта.
								</h1>
								<p className="panel__description">
									Интерфейс пересобран под рабочий сценарий: авторизация, список задач, посты и профиль в одной структуре.
								</p>
								<div className="button-row">
									<Button asChild className="app-button-primary">
										<Link to="/sign-in">
											Войти
											<ArrowRight className="link-icon"/>
										</Link>
									</Button>
									<Button asChild variant="outline" className="app-button-secondary">
										<Link to="/sign-up">Создать аккаунт</Link>
									</Button>
								</div>
							</CardContent>
						</Card>

						<div className="feature-grid">
							{[
								{icon: ListTodo, title: "Todo board", description: "Создание, редактирование, удаление и пагинация задач."},
								{icon: ShieldCheck, title: "Auth flow", description: "Демо-вход для user/admin и локальное хранение профиля."},
								{icon: CheckCheck, title: "Posts & profile", description: "Дополнительные страницы сохранены из учебной структуры."},
							].map((item) => (
								<Card key={item.title} className="feature-card">
									<CardContent className="feature-card__row">
										<div className="icon-box">
											<item.icon className="app-brand__icon"/>
										</div>
										<div>
											<h2 className="feature-card__title">{item.title}</h2>
											<p className="feature-card__text">{item.description}</p>
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
			<div className="page-shell">
				<section className="home-layout home-layout--user">
					<Card className="panel">
						<CardContent className="panel__content panel__content--lg">
							<div className="feature-card__row">
								<div className="icon-box">
									<UserRound className="app-brand__icon"/>
								</div>
								<div>
									<p className="feature-card__text">Рабочая зона</p>
									<h1 className="panel__title panel__title--sm">Здравствуйте, {user.name}</h1>
								</div>
							</div>
							<p className="panel__description">
								Это не лендинг. Это вход в приложение. Основной сценарий здесь - быстро перейти к задачам, постам или профилю без лишнего текста и пустых блоков.
							</p>
							<div className="button-row">
								<Button asChild className="app-button-primary">
									<Link to="/todos">
										Открыть задачи
										<ArrowRight className="link-icon"/>
									</Link>
								</Button>
								<Button asChild variant="outline" className="app-button-secondary">
									<Link to="/posts">Открыть посты</Link>
								</Button>
								<Button asChild variant="outline" className="app-button-secondary">
									<Link to="/profile">Профиль</Link>
								</Button>
							</div>
						</CardContent>
					</Card>

					<div className="quick-grid">
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
							<Card key={item.title} className="quick-card">
								<CardContent className="quick-card__body">
									<div className="icon-box">
										<item.icon className="app-brand__icon"/>
									</div>
									<h2 className="quick-card__title">{item.title}</h2>
									<p className="quick-card__text">{item.description}</p>
									<Link to={item.link} className="quick-card__link">
										Открыть
										<ArrowRight className="link-icon"/>
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
