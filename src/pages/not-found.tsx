import {Link, useLocation} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

const NotFound = () => {
	const {pathname} = useLocation();

	console.log(pathname)
	return (
			<div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
				<Card className="w-full max-w-xl border-white/70 bg-white/85 text-center shadow-[0_24px_60px_-30px_rgba(30,41,59,0.35)]">
					<CardContent className="space-y-5 p-10">
						<h1 className="text-6xl font-semibold tracking-tight text-slate-950">404</h1>
						{pathname.includes('/posts') ? (
								<p className="text-slate-600">
									Пост не найден либо был удален
								</p>
						) : (
								<p className="text-slate-600">Страница не найдена</p>
						)}
						<Button asChild className="rounded-full bg-slate-950 text-white hover:bg-slate-800">
							<Link to="/">На главную</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
	);
};

export default NotFound;
