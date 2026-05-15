import {BarChart3, ShieldCheck, Users, Workflow} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const Dashboard = () => {
	return (
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardContent className="p-8">
							<div className="mb-4 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
								Admin workspace
							</div>
							<h1 className="text-3xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
								Это уже не пустая заглушка. Экран админа оформлен как часть той же системы: обзор, контрольные метрики и служебные блоки.
							</p>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)]">
						<CardContent className="p-6">
							<p className="text-sm font-medium text-slate-300">Access level</p>
							<p className="mt-6 text-5xl font-semibold text-white">Admin</p>
							<p className="mt-2 text-sm text-slate-300">Расширенный доступ к управлению приложением.</p>
						</CardContent>
					</Card>
				</section>

				<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{[
						{title: "Users", value: "124", icon: Users},
						{title: "Workflows", value: "18", icon: Workflow},
						{title: "Reports", value: "9", icon: BarChart3},
						{title: "Security", value: "OK", icon: ShieldCheck},
					].map((item) => (
						<Card key={item.title} className="rounded-xl border-slate-200 bg-white shadow-none">
							<CardContent className="p-5">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-slate-500">{item.title}</p>
									<div className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
										<item.icon className="size-4 text-slate-700"/>
									</div>
								</div>
								<p className="mt-5 text-3xl font-semibold text-slate-950">{item.value}</p>
							</CardContent>
						</Card>
					))}
				</section>

				<section className="grid gap-4 lg:grid-cols-2">
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardHeader className="border-b border-slate-200 pb-4">
							<CardTitle className="text-xl">Операции</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 p-6">
							{["Управление ролями пользователей", "Проверка активности по страницам", "Контроль служебных сценариев"].map((item) => (
								<div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
									{item}
								</div>
							))}
						</CardContent>
					</Card>
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardHeader className="border-b border-slate-200 pb-4">
							<CardTitle className="text-xl">Состояние системы</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 p-6">
							{["API endpoints доступны", "Локальный state storage активен", "UI build собран без ошибок"].map((item) => (
								<div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
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
