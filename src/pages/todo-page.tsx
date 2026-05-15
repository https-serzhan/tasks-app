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
			<div className="page-shell">
				<section className="todo-layout">
					<Card className="panel">
						<CardContent className="panel__content">
							<div className="todo-summary">
								<div className="todo-summary__top">
									<div>
										<div className="panel__eyebrow">Task board</div>
										<h1 className="panel__title">Todo list</h1>
										<p className="panel__description">
											Компактный рабочий экран для создания, редактирования и завершения задач.
										</p>
									</div>

									<div className="stat-grid">
										<div className="stat-card">
											<div className="stat-card__row">
												<span className="stat-card__label">Всего</span>
												<ListTodo className="app-brand__icon"/>
											</div>
											<p className="stat-card__value">{todos.length}</p>
										</div>
										<div className="stat-card stat-card--warning">
											<div className="stat-card__row">
												<span className="stat-card__label">В работе</span>
												<CircleDashed className="app-brand__icon"/>
											</div>
											<p className="stat-card__value">{pendingCount}</p>
										</div>
										<div className="stat-card stat-card--success">
											<div className="stat-card__row">
												<span className="stat-card__label">Готово</span>
												<CheckCheck className="app-brand__icon"/>
											</div>
											<p className="stat-card__value">{completedCount}</p>
										</div>
									</div>
								</div>

								<div className="todo-create-wrap">
									<CreateTodo onCreateTodo={handleCreateTodo}/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="panel panel--dark">
						<CardContent className="sidebar-panel__content">
							<p className="sidebar-panel__label">Navigation</p>
							<div className="sidebar-metric">
								<div>
									<p className="sidebar-metric__value">{page}</p>
									<p className="sidebar-metric__text">Текущая страница</p>
								</div>
								<div className="sidebar-divider"/>
								<div>
									<p className="sidebar-metric__value">{totalPages}</p>
									<p className="sidebar-metric__text">Всего страниц</p>
								</div>
								<div className="sidebar-divider"/>
								<div>
									<p className="sidebar-metric__value">{limit}</p>
									<p className="sidebar-metric__text">Задач на страницу</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				<Card className="panel">
					<CardHeader className="list-panel__header">
						<div>
							<CardTitle className="list-panel__title">Список задач</CardTitle>
							<p className="list-panel__text">Страница {page} из {totalPages}</p>
						</div>
						<div className="list-panel__controls">
							<span className="list-panel__text">Показывать</span>
							<Select value={String(limit)} onValueChange={(value) => handleLimitChange(Number(value))}>
								<SelectTrigger className="list-panel__select">
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

					<CardContent className="list-panel__content">
						{isPendingTodos ? (
								[...Array(limit)].map((_, i) => (
										<Skeleton key={i} className="loading-card"/>
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

						<Pagination className="list-panel__pagination">
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
											href="#"
											text="Назад"
											className={page === 1 ? "is-disabled" : ""}
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
											<div key={pageNumber} className="pagination-page-wrap">
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
											className={page >= totalPages ? "is-disabled" : ""}
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
