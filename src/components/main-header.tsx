import {NavLink} from "react-router";
import {useUserStore} from "../store/user/hooks.ts";
import UserAvatar from "./user-avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {LayoutDashboard, Sparkles} from "lucide-react";

const MainHeader = () => {
	const {user} = useUserStore()

	const navClassName = ({isActive}: { isActive: boolean }) => cn(
			"rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-950",
			isActive && "bg-slate-900 text-white hover:bg-slate-900 hover:text-white"
	);

	return (
			<header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-100/95 backdrop-blur">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
					<NavLink to="/" className="flex min-w-0 items-center gap-3 text-slate-950">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
							<LayoutDashboard className="size-4"/>
						</div>
						<div className="min-w-0">
							<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Mentory lesson base</p>
							<h2 className="truncate text-base font-semibold">Styled Todo</h2>
						</div>
					</NavLink>
					<div className="flex items-center gap-3">
						{user && (
								<div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm md:flex">
									<Sparkles className="size-3.5 text-slate-400"/>
									<span>{user.role === "admin" ? "Admin workspace" : "Personal workspace"}</span>
								</div>
						)}
						<nav className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
							<NavLink to="/" className={navClassName}>Главная</NavLink>
							{user && (
									<>
										<NavLink to="/todos" className={navClassName}>Дела</NavLink>
										<NavLink to="/posts" className={navClassName}>Посты</NavLink>
									</>
							)}
							{!user && (
									<Button asChild className="h-9 rounded-md bg-slate-900 px-4 text-white hover:bg-slate-800">
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
