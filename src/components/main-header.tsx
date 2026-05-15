import {NavLink} from "react-router";
import {useUserStore} from "../store/user/hooks.ts";
import UserAvatar from "./user-avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LayoutDashboard, Sparkles} from "lucide-react";

const MainHeader = () => {
	const {user} = useUserStore()

	const navClassName = ({isActive}: { isActive: boolean }) =>
		isActive ? "app-nav__link app-nav__link--active" : "app-nav__link";

	return (
			<header className="app-header">
				<div className="app-header__inner">
					<NavLink to="/" className="app-brand">
						<div className="app-brand__mark">
							<LayoutDashboard className="app-brand__icon"/>
						</div>
						<div>
							<p className="app-brand__eyebrow">Mentory lesson base</p>
							<h2 className="app-brand__title">Styled Todo</h2>
						</div>
					</NavLink>
					<div className="app-header__right">
						{user && (
								<div className="workspace-pill">
									<Sparkles className="workspace-pill__icon"/>
									<span>{user.role === "admin" ? "Admin workspace" : "Personal workspace"}</span>
								</div>
						)}
						<nav className="app-nav">
							<NavLink to="/" className={navClassName}>Главная</NavLink>
							{user && (
									<>
										<NavLink to="/todos" className={navClassName}>Дела</NavLink>
										<NavLink to="/posts" className={navClassName}>Посты</NavLink>
									</>
							)}
							{!user && (
									<Button asChild className="app-button-primary">
										<NavLink to="/sign-in">Войти</NavLink>
									</Button>
							)}
						</nav>
						<UserAvatar/>
					</div>
				</div>
			</header>
	);
};

export default MainHeader;
