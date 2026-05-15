import {Link, useLocation} from "react-router";
import {ArrowLeft, Compass} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

const NotFound = () => {
	const {pathname} = useLocation();

	return (
			<div className="page-shell center-page">
				<Card className="panel notfound-card">
					<CardContent className="notfound-content">
						<div className="icon-box">
							<Compass className="app-brand__icon"/>
						</div>
						<h1 className="notfound-title">404</h1>
						<p className="notfound-text">
							{pathname.includes('/posts')
								? 'Пост не найден либо был удален.'
								: 'Страница не найдена.'}
						</p>
						<Button asChild className="notfound-action">
							<Link to="/">
								<ArrowLeft className="inline-icon-left"/>
								На главную
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
	);
};

export default NotFound;
