import {NavLink} from "react-router";
import {useUserStore} from "../store/user/hooks.ts";
import UserAvatar from "./user-avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {LayoutDashboard} from "lucide-react";

const MainHeader = () => {
	const {user} = useUserStore()

	const navClassName = ({isActive}: { isActive: boolean }) => cn(
			"rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950",
			isActive && "bg-slate-950 text-white hover:bg-slate-950 hover:text-white"
	);

	return (
			<header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-xl">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
					<NavLink to="/" className="flex items-center gap-3 text-slate-950">
						<div className="rounded-2xl bg-slate-950 p-2 text-white">
							<LayoutDashboard className="size-4"/>
						</div>
						<div>
							<p className="text-sm font-medium text-slate-500">Mentory lesson base</p>
							<h2 className="text-lg font-semibold">Styled Todo</h2>
						</div>
					</NavLink>
					<nav className="flex items-center gap-2">
						<NavLink to="/" className={navClassName}>Главная</NavLink>
						{user && (
								<>
									<NavLink to="/todos" className={navClassName}>Дела</NavLink>
									<NavLink to="/posts" className={navClassName}>Посты</NavLink>
								</>
						)}
						{!user && (
								<Button asChild className="rounded-full bg-slate-950 text-white hover:bg-slate-800">
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
