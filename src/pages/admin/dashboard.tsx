import {BarChart3, ShieldCheck, Users, Workflow} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const Dashboard = () => {
	return (
			<div className="page-shell">
				<section className="admin-layout">
					<Card className="panel">
						<CardContent className="panel__content panel__content--lg">
							<div className="panel__eyebrow">Admin workspace</div>
							<h1 className="panel__title">Dashboard</h1>
							<p className="panel__description">
								Это уже не пустая заглушка. Экран админа оформлен как часть той же системы: обзор, контрольные метрики и служебные блоки.
							</p>
						</CardContent>
					</Card>

					<Card className="panel panel--dark">
						<CardContent className="sidebar-panel__content">
							<p className="sidebar-panel__label">Access level</p>
							<p className="sidebar-metric__value">Admin</p>
							<p className="sidebar-metric__text">Расширенный доступ к управлению приложением.</p>
						</CardContent>
					</Card>
				</section>

				<section className="admin-metrics">
					{[
						{title: "Users", value: "124", icon: Users},
						{title: "Workflows", value: "18", icon: Workflow},
						{title: "Reports", value: "9", icon: BarChart3},
						{title: "Security", value: "OK", icon: ShieldCheck},
					].map((item) => (
						<Card key={item.title} className="panel">
							<CardContent className="panel__content">
								<div className="stat-card__row">
									<p className="list-panel__text">{item.title}</p>
									<div className="icon-box">
										<item.icon className="app-brand__icon"/>
									</div>
								</div>
								<p className="stat-card__value">{item.value}</p>
							</CardContent>
						</Card>
					))}
				</section>

				<section className="admin-grid">
					<Card className="panel">
						<CardHeader className="panel__header">
							<CardTitle className="list-panel__title">Операции</CardTitle>
						</CardHeader>
						<CardContent className="admin-list">
							{["Управление ролями пользователей", "Проверка активности по страницам", "Контроль служебных сценариев"].map((item) => (
								<div key={item} className="admin-list-item">
									{item}
								</div>
							))}
						</CardContent>
					</Card>
					<Card className="panel">
						<CardHeader className="panel__header">
							<CardTitle className="list-panel__title">Состояние системы</CardTitle>
						</CardHeader>
						<CardContent className="admin-list">
							{["API endpoints доступны", "Локальный state storage активен", "UI build собран без ошибок"].map((item) => (
								<div key={item} className="admin-list-item">
									{item}
								</div>
							))}
						</CardContent>
					</Card>
				</section>
			</div>
	);
};

export default Dashboard;
