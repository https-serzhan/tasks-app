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
			<div className="space-y-3">
				<form className="flex flex-col gap-3 lg:flex-row" onSubmit={handleSubmit}>
					<Input
							disabled={isPending}
							placeholder="Что нужно сделать?"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="h-11 rounded-lg border-slate-200 bg-white shadow-none"
					/>
					<Button
							type='submit'
							disabled={isPending || !title.trim()}
							className="h-11 min-w-36 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
					>
						<Plus className="mr-2 size-4"/>
						{isPending ? "Добавление..." : "Добавить"}
					</Button>
				</form>

				{isPending && (
						<Skeleton className="h-14 rounded-lg bg-slate-200/70"/>
				)}
			</div>
	);
};

export default CreateTodo;
