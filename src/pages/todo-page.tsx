import {useEffect, useState} from "react";
import type {TodoType} from "../types/todo.ts";
import {updateTodo} from "../utils/api/requests/update-todo.ts";
import {getTodos} from "../utils/api/requests/get-todos.ts";
import CreateTodo from "../components/create-todo.tsx";
import TodoCard from "../components/todo-card.tsx";
import {createTodo} from "../utils/api/requests/create-todo.ts";
import {deleteTodo} from "../utils/api/requests/delete-todo.ts";
import {CheckCheck, CircleDashed, ListTodo} from "lucide-react";
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

	const handlePageChange = (nextPage: number) => {
		setIsPendingTodos(true);
		setQParams(prev => ({...prev, page: nextPage}))
	}

	const handleLimitChange = (nextLimit: number) => {
		setIsPendingTodos(true);
		setQParams(prev => ({...prev, limit: nextLimit, page: 1}))
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
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardContent className="p-6 sm:p-7">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
									<div>
										<div className="mb-3 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
											Task board
										</div>
										<h1 className="text-3xl font-semibold tracking-tight text-slate-950">Todo list</h1>
										<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
											Компактный рабочий экран для создания, редактирования и завершения задач.
										</p>
									</div>

									<div className="grid gap-3 sm:grid-cols-3">
										<div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
											<div className="flex items-center justify-between">
												<span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Всего</span>
												<ListTodo className="size-4 text-slate-500"/>
											</div>
											<p className="mt-3 text-3xl font-semibold text-slate-950">{todos.length}</p>
										</div>
										<div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
											<div className="flex items-center justify-between">
												<span className="text-xs font-medium uppercase tracking-[0.14em] text-amber-700/70">В работе</span>
												<CircleDashed className="size-4 text-amber-600"/>
											</div>
											<p className="mt-3 text-3xl font-semibold text-amber-700">{pendingCount}</p>
										</div>
										<div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
											<div className="flex items-center justify-between">
												<span className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700/70">Готово</span>
												<CheckCheck className="size-4 text-emerald-600"/>
											</div>
											<p className="mt-3 text-3xl font-semibold text-emerald-700">{completedCount}</p>
										</div>
									</div>
								</div>

								<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<CreateTodo onCreateTodo={handleCreateTodo}/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.35)]">
						<CardContent className="p-6">
							<p className="text-sm font-medium text-slate-300">Navigation</p>
							<div className="mt-6 space-y-4">
								<div>
									<p className="text-4xl font-semibold text-white">{page}</p>
									<p className="mt-1 text-sm text-slate-300">Текущая страница</p>
								</div>
								<div className="h-px bg-white/10"/>
								<div>
									<p className="text-4xl font-semibold text-white">{totalPages}</p>
									<p className="mt-1 text-sm text-slate-300">Всего страниц</p>
								</div>
								<div className="h-px bg-white/10"/>
								<div>
									<p className="text-4xl font-semibold text-white">{limit}</p>
									<p className="mt-1 text-sm text-slate-300">Задач на страницу</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
					<CardHeader className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<CardTitle className="text-xl">Список задач</CardTitle>
							<p className="mt-1 text-sm text-slate-500">Страница {page} из {totalPages}</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-slate-500">Показывать</span>
							<Select value={String(limit)} onValueChange={(value) => handleLimitChange(Number(value))}>
								<SelectTrigger className="h-10 w-24 rounded-lg border-slate-200 bg-white shadow-none">
									<SelectValue placeholder="Лимит"/>
								</SelectTrigger>
								<SelectContent>
									{[5, 10, 25, 50].map((itemLimit) => (
										<SelectItem key={itemLimit} value={String(itemLimit)}>{itemLimit}</SelectItem>
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
