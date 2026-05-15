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
							<Button variant="ghost" className="user-menu-trigger">
								<Avatar className="user-menu-avatar">
									<AvatarImage src={user.avatar}/>
									<AvatarFallback>{fallback}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>{user.name}</TooltipContent>
				</Tooltip>
				<DropdownMenuContent align="end" className="user-menu-content">
					<DropdownMenuLabel className="user-menu-label">
						<p className="user-menu-name">{user.name}</p>
						<p className="user-menu-email">{user.email}</p>
					</DropdownMenuLabel>
					<DropdownMenuSeparator/>
					<DropdownMenuItem onClick={() => navigate('/profile')}>
						<Avatar className="user-menu-inline-avatar">
							<AvatarImage src={user.avatar}/>
							<AvatarFallback>{fallback}</AvatarFallback>
						</Avatar>
						Профиль
					</DropdownMenuItem>
					{user.role === 'admin' && (
							<DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
								<Settings className="user-menu-item-icon"/>
								Админ
							</DropdownMenuItem>
					)}
					<DropdownMenuSeparator/>
					<DropdownMenuItem onClick={() => {
						sign_out();
					}}>
						<LogOut className="user-menu-item-icon"/>
						Выход
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
	);
};

export default UserAvatar;
