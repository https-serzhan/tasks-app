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
			<Card className="todo-item">
				<CardContent className="todo-item__content">
					<div className="todo-item__check">
						<Checkbox
								id={`todo-${todo.id}`}
								disabled={isUpdating || isDeleting}
								checked={todo.completed}
								onCheckedChange={handleUpdateTodoStatus}
								className="todo-item__checkbox"
						/>
					</div>

					<label htmlFor={`todo-${todo.id}`} className="todo-item__body">
						<div className="todo-item__meta">
							<span>Task #{todo.id}</span>
							{todo.completed && <span className="todo-item__badge">Done</span>}
						</div>
						<p className={[
							"todo-item__title",
							isUpdating ? "todo-item__title--updating" : "",
							todo.completed ? "todo-item__title--completed" : ""
						].filter(Boolean).join(" ")}>
							{todo.title}
						</p>
					</label>

					<div className="todo-item__actions">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" onClick={() => void handleToggleEditTitle(true)} disabled={isDeleting} className="app-button-icon todo-item__action">
									<PencilLine className="user-menu-item-icon"/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Редактировать</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" onClick={() => void deleteTodo()} disabled={isDeleting || isUpdating} className="app-button-icon app-button-icon-danger todo-item__action">
									<Trash2 className="user-menu-item-icon"/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Удалить</TooltipContent>
						</Tooltip>
					</div>
				</CardContent>

				<Dialog open={isTitleEdit} onOpenChange={(open) => void handleToggleEditTitle(open)}>
					<DialogContent className="todo-dialog__content">
						<DialogHeader>
							<DialogTitle>Редактирование задачи</DialogTitle>
							<DialogDescription>Измените заголовок и сохраните карточку.</DialogDescription>
						</DialogHeader>
						<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Название задачи"
								className="form-input todo-dialog__input"
						/>
						<DialogFooter className="todo-dialog__footer">
							<Button variant="outline" className="app-button-secondary" onClick={() => void handleToggleEditTitle(false)}>Отмена</Button>
							<Button className="app-button-primary" onClick={() => void handleToggleEditTitle(false)} disabled={isUpdating || !title.trim()}>
								{isUpdating ? <Check className="todo-save-icon todo-save-icon--pending"/> : <Save className="todo-save-icon"/>}
								Сохранить
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</Card>
	);
};

export default TodoCard;
