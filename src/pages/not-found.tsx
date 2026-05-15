import {Link, useLocation} from "react-router";
import {ArrowLeft, Compass} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

const NotFound = () => {
	const {pathname} = useLocation();

	return (
			<div className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
				<Card className="w-full max-w-2xl rounded-2xl border-slate-200 bg-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.22)]">
					<CardContent className="p-10 text-center">
						<div className="mx-auto flex size-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
							<Compass className="size-6 text-slate-700"/>
						</div>
						<h1 className="mt-6 text-6xl font-semibold tracking-tight text-slate-950">404</h1>
						<p className="mt-4 text-base text-slate-600">
							{pathname.includes('/posts')
								? 'Пост не найден либо был удален.'
								: 'Страница не найдена.'}
						</p>
						<Button asChild className="mt-8 h-11 rounded-lg bg-slate-900 px-5 text-white hover:bg-slate-800">
							<Link to="/">
								<ArrowLeft className="mr-2 size-4"/>
								На главную
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
	);
};

export default NotFound;
