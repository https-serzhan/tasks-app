import {useEffect, useState} from "react";
import type {TodoType} from "../types/todo.ts";
import {updateTodo} from "../utils/api/requests/update-todo.ts";
import {getTodos} from "../utils/api/requests/get-todos.ts";
import CreateTodo from "../components/create-todo.tsx";
import TodoCard from "../components/todo-card.tsx";
import {createTodo} from "../utils/api/requests/create-todo.ts";
import {deleteTodo} from "../utils/api/requests/delete-todo.ts";
import {CheckCheck, CircleDashed, ListFilter, ListTodo} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const TodoPage = () => {
	const [isPendingTodos, setIsPendingTodos] = useState(true);
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [qParams, setQParams] = useState({
		page: 1,
		limit: 10,
		total: 0,
	});
	const {page, limit, total} = qParams;

	const handlePageChange = (page: number) => {
		setIsPendingTodos(true);
		setQParams(prev => ({...prev, page}))
	}

	const handleLimitChange = (limit: number) => {
		setIsPendingTodos(true);
		setQParams(prev => ({...prev, limit, page: 1}))
	}

	const toggleTodo = async (id: number, completed: boolean) => {
		const updatedTodo = await updateTodo(id, {completed})
		setTodos(prev => prev.map(todo => todo.id === id ? {...todo, completed: updatedTodo.completed} : todo))
	}

	const updateTodoTitle = async (id: number, title: string) => {
		const updatedTodo = await updateTodo(id, {title})
		setTodos(prev => prev.map(todo => todo.id === id ? {...todo, ...updatedTodo} : todo))
	}

	const handleCreateTodo = async (title: string) => {
		const newTodo = await createTodo(title)
		setTodos(prev => [
			{
				...newTodo,
				completed: false,
				id: prev.length + 1,
				userId: 1,
			}, ...prev])
	}

	const handleDeleteTodo = async (id: number) => {
		const isDeleted = await deleteTodo(id)
		if (isDeleted) {
			setTodos(prev => prev.filter(todo => todo.id !== id))
		}
	}

	useEffect(() => {
		getTodos({page, limit}).then((data) => {
			setTodos(data.todos)
			setQParams(prev => ({...prev, total: data.total}))
		}).finally(() => {
			setIsPendingTodos(false)
		})
	}, [page, limit]);

	const completedCount = todos.filter((todo) => todo.completed).length;
	const pendingCount = todos.length - completedCount;
	const totalPages = Math.max(1, Math.ceil(total / limit));
	const visiblePages = Array.from({length: totalPages}, (_, index) => index + 1).filter((pageNumber) => {
		return Math.abs(pageNumber - page) <= 1 || pageNumber === 1 || pageNumber === totalPages;
	});

	return (
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
					<div className="space-y-4">
						<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)]">
							<CardContent className="flex flex-col gap-5 p-6">
								<div className="flex items-center gap-3 text-sm font-medium text-slate-300">
									<div className="rounded-lg bg-white/10 p-2 text-white">
										<ListTodo className="size-4"/>
									</div>
									<span>Task board</span>
								</div>
								<div className="space-y-2">
									<h1 className="text-2xl font-semibold tracking-tight text-white">Todo list</h1>
									<p className="text-sm leading-6 text-slate-300">
										Минималистичный рабочий список без лишнего декора.
									</p>
								</div>
							</CardContent>
						</Card>

						<div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
							<Card className="rounded-xl border-slate-200 bg-white shadow-none">
								<CardContent className="flex items-center justify-between p-4">
									<div>
										<p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Всего</p>
										<p className="mt-2 text-3xl font-semibold text-slate-950">{todos.length}</p>
									</div>
									<div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
										<ListTodo className="size-4 text-slate-700"/>
									</div>
								</CardContent>
							</Card>
							<Card className="rounded-xl border-slate-200 bg-white shadow-none">
								<CardContent className="flex items-center justify-between p-4">
									<div>
										<p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">В работе</p>
										<p className="mt-2 text-3xl font-semibold text-amber-600">{pendingCount}</p>
									</div>
									<div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
										<CircleDashed className="size-4 text-amber-700"/>
									</div>
								</CardContent>
							</Card>
							<Card className="rounded-xl border-slate-200 bg-white shadow-none">
								<CardContent className="flex items-center justify-between p-4">
									<div>
										<p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Закрыто</p>
										<p className="mt-2 text-3xl font-semibold text-emerald-600">{completedCount}</p>
									</div>
									<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5">
										<CheckCheck className="size-4 text-emerald-700"/>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardContent className="p-5 sm:p-6">
							<div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
								<div className="flex items-center gap-3 text-sm font-medium text-slate-500">
									<div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700">
										<ListFilter className="size-4"/>
									</div>
									<div>
										<p className="text-base font-semibold text-slate-950">Управление задачами</p>
										<p className="mt-1 text-sm text-slate-500">Добавление, редактирование и смена статуса.</p>
									</div>
								</div>
							</div>
							<CreateTodo onCreateTodo={handleCreateTodo}/>
						</CardContent>
					</Card>
				</section>

				<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
					<CardHeader className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<CardTitle className="text-lg">Список задач</CardTitle>
							<p className="mt-1 text-sm text-slate-500">Страница {page} из {totalPages}</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-slate-500">Показывать</span>
							<Select value={String(limit)} onValueChange={(value) => handleLimitChange(Number(value))}>
								<SelectTrigger className="h-9 w-24 rounded-lg border-slate-200 bg-white shadow-none">
									<SelectValue placeholder="Лимит"/>
								</SelectTrigger>
								<SelectContent>
									{[5, 10, 25, 50].map((limit) => (
										<SelectItem key={limit} value={String(limit)}>{limit}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</CardHeader>

					<CardContent className="space-y-3 p-4 sm:p-6">
						{isPendingTodos ? (
								[...Array(limit)].map((_, i) => (
										<Skeleton key={i} className="h-20 rounded-xl bg-slate-200/70"/>
								))
						) : (
								todos.map((todo) => (
										<TodoCard
												key={todo.id}
												todo={todo}
												toggleTodo={toggleTodo}
												updateTodoTitle={updateTodoTitle}
												handleDeleteTodo={handleDeleteTodo}
										/>
								))
						)}
						<Pagination className="justify-between border-t border-slate-200 pt-4">
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
											href="#"
											text="Назад"
											className={page === 1 ? "pointer-events-none opacity-40" : ""}
											onClick={(e) => {
												e.preventDefault();
												if (page > 1) handlePageChange(page - 1);
											}}
									/>
								</PaginationItem>
							</PaginationContent>
							<PaginationContent>
								{visiblePages.map((pageNumber, index) => {
									const previousPage = visiblePages[index - 1];
									const showEllipsis = previousPage && pageNumber - previousPage > 1;

									return (
											<div key={pageNumber} className="flex items-center">
												{showEllipsis && (
														<PaginationItem>
															<PaginationEllipsis/>
														</PaginationItem>
												)}
												<PaginationItem>
													<PaginationLink
															href="#"
															isActive={pageNumber === page}
															onClick={(e) => {
																e.preventDefault();
																handlePageChange(pageNumber);
															}}
													>
														{pageNumber}
													</PaginationLink>
												</PaginationItem>
											</div>
									);
								})}
							</PaginationContent>
							<PaginationContent>
								<PaginationItem>
									<PaginationNext
											href="#"
											text="Дальше"
											className={page >= totalPages ? "pointer-events-none opacity-40" : ""}
											onClick={(e) => {
												e.preventDefault();
												if (page < totalPages) handlePageChange(page + 1);
											}}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</CardContent>
				</Card>
			</div>
	);
};

export default TodoPage;
