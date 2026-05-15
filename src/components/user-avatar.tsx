import {useUserStore} from "../store/user/hooks.ts";
import {useNavigate} from "react-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {LogOut, Settings} from "lucide-react";

const UserAvatar = () => {
	const {user, sign_out} = useUserStore()
	const navigate = useNavigate();

	if (!user) return null;

	const fallback = user.name.split(' ').slice(0, 2).map(name => name[0]).join('');

	return (
			<DropdownMenu>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="size-10 rounded-lg border border-slate-200 bg-white p-0 shadow-sm hover:bg-slate-50">
								<Avatar className="size-8 rounded-md">
									<AvatarImage src={user.avatar}/>
									<AvatarFallback>{fallback}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>{user.name}</TooltipContent>
				</Tooltip>
				<DropdownMenuContent align="end" className="w-60">
					<DropdownMenuLabel className="space-y-1 py-3">
						<p className="font-medium text-slate-950">{user.name}</p>
						<p className="text-xs text-slate-500">{user.email}</p>
					</DropdownMenuLabel>
					<DropdownMenuSeparator/>
					<DropdownMenuItem onClick={() => navigate('/profile')}>
						<Avatar className="mr-2 size-6">
							<AvatarImage src={user.avatar}/>
							<AvatarFallback>{fallback}</AvatarFallback>
						</Avatar>
						Профиль
					</DropdownMenuItem>
					{user.role === 'admin' && (
							<DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
								<Settings className="mr-2 size-4"/>
								Админ
							</DropdownMenuItem>
					)}
					<DropdownMenuSeparator/>
					<DropdownMenuItem onClick={() => {
						sign_out();
					}}>
						<LogOut className="mr-2 size-4"/>
						Выход
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
	);
};

export default UserAvatar;
