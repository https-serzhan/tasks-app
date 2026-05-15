import {NavLink} from "react-router";
import {useUserStore} from "../store/user/hooks.ts";
import UserAvatar from "./user-avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {LayoutDashboard} from "lucide-react";

const MainHeader = () => {
	const {user} = useUserStore()

	const navClassName = ({isActive}: { isActive: boolean }) => cn(
			"rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950",
			isActive && "bg-slate-900 text-white shadow-sm hover:bg-slate-900 hover:text-white"
	);

	return (
			<header className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-xl">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
					<NavLink to="/" className="flex items-center gap-3 text-slate-950">
						<div className="rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-sm">
							<LayoutDashboard className="size-4"/>
						</div>
						<div>
							<p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Mentory lesson base</p>
							<h2 className="text-base font-semibold">Styled Todo</h2>
						</div>
					</NavLink>
					<nav className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 p-1 shadow-sm">
						<NavLink to="/" className={navClassName}>Главная</NavLink>
						{user && (
								<>
									<NavLink to="/todos" className={navClassName}>Дела</NavLink>
									<NavLink to="/posts" className={navClassName}>Посты</NavLink>
								</>
						)}
						{!user && (
								<Button asChild className="rounded-lg bg-slate-900 text-white hover:bg-slate-800">
									<NavLink to="/sign-in">Войти</NavLink>
								</Button>
						)}

						<UserAvatar/>
					</nav>
				</div>
			</header>
	);
};

export default MainHeader;
