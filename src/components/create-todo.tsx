import * as React from "react";
import {useState} from "react";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

type CreateTodoProps = {
	onCreateTodo: (title: string) => Promise<void>
}

const CreateTodo = ({onCreateTodo}: CreateTodoProps) => {
	const [isPending, setIsPending] = useState(false);
	const [title, setTitle] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		setIsPending(true)
		await onCreateTodo(title.trim());
		setTitle('');
		setIsPending(false)
	}

	return (
			<div className="todo-create">
				<form className="todo-create__form" onSubmit={handleSubmit}>
					<Input
							disabled={isPending}
							placeholder="Что нужно сделать?"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="todo-create__input"
					/>
					<Button
							type='submit'
							disabled={isPending || !title.trim()}
							className="todo-create__submit"
					>
						<Plus className="todo-create__submit-icon"/>
						{isPending ? "Добавление..." : "Добавить"}
					</Button>
				</form>

				{isPending && (
						<Skeleton className="todo-create__skeleton"/>
				)}
			</div>
	);
};

export default CreateTodo;
