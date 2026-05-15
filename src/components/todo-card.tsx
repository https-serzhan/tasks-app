import type {TodoType} from "../types/todo.ts";
import {useState} from "react";
import {Check, PencilLine, Save, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

type TodoCardProps = {
	todo: TodoType
	toggleTodo: (id: number, completed: boolean) => Promise<void>
	updateTodoTitle: (id: number, title: string) => Promise<void>
	handleDeleteTodo: (id: number) => Promise<void>
}

const TodoCard = ({todo, toggleTodo, updateTodoTitle, handleDeleteTodo}: TodoCardProps) => {
	const [title, setTitle] = useState(todo.title);
	const [isTitleEdit, setIsTitleEdit] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdateTodoStatus = async () => {
		setIsUpdating(true);
		await toggleTodo(todo.id, !todo.completed)
		setIsUpdating(false);
	}

	const handleUpdateTodoTitle = async () => {
		setIsUpdating(true);
		await updateTodoTitle(todo.id, title.trim())
		setIsUpdating(false);
	}

	const handleToggleEditTitle = async (nextOpen?: boolean) => {
		const shouldOpen = typeof nextOpen === "boolean" ? nextOpen : !isTitleEdit;

		if (!shouldOpen && title.trim() !== todo.title) {
			await handleUpdateTodoTitle();
		}

		setIsTitleEdit(shouldOpen);
	}

	const deleteTodo = async () => {
		setIsDeleting(true);
		await handleDeleteTodo(todo.id)
		setIsDeleting(false);
	}

	return (
			<Card className="overflow-hidden border-white/70 bg-white/85 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
				<CardContent className="flex items-start gap-4 p-4 sm:items-center">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
						<Checkbox
								id={`todo-${todo.id}`}
								disabled={isUpdating || isDeleting}
								checked={todo.completed}
								onCheckedChange={handleUpdateTodoStatus}
								className="size-5 rounded-md"
						/>
					</div>

					<label htmlFor={`todo-${todo.id}`} className="min-w-0 flex-1 cursor-pointer">
						<div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
							<span>Task #{todo.id}</span>
							{todo.completed && <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] tracking-[0.12em] text-emerald-700">Done</span>}
						</div>
						<p className={`mt-2 text-base font-medium text-slate-900 transition-opacity ${isUpdating ? "opacity-50" : ""} ${todo.completed ? "line-through decoration-2 text-slate-400" : ""}`}>
							{todo.title}
						</p>
					</label>

					<div className="flex shrink-0 items-center gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" onClick={() => void handleToggleEditTitle(true)} disabled={isDeleting} className="size-10 rounded-xl border-slate-200 bg-white">
									<PencilLine className="size-4"/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Редактировать</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" onClick={() => void deleteTodo()} disabled={isDeleting || isUpdating} className="size-10 rounded-xl border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700">
									<Trash2 className="size-4"/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Удалить</TooltipContent>
						</Tooltip>
					</div>
				</CardContent>

				<Dialog open={isTitleEdit} onOpenChange={(open) => void handleToggleEditTitle(open)}>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Редактирование задачи</DialogTitle>
							<DialogDescription>Измените заголовок и сохраните карточку.</DialogDescription>
						</DialogHeader>
						<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Название задачи"
								className="h-11"
						/>
						<DialogFooter className="gap-2 sm:justify-end">
							<Button variant="outline" onClick={() => void handleToggleEditTitle(false)}>Отмена</Button>
							<Button onClick={() => void handleToggleEditTitle(false)} disabled={isUpdating || !title.trim()}>
								{isUpdating ? <Check className="mr-2 size-4 animate-pulse"/> : <Save className="mr-2 size-4"/>}
								Сохранить
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</Card>
	);
};

export default TodoCard;
