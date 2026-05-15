import {useLayoutEffect, useMemo, useState} from "react";
import {Link} from "react-router";
import {ArrowRight, FileText, Search} from "lucide-react";
import type {PostType} from "../types/post.ts";
import {getPosts} from "../utils/api/requests/get-posts.ts";
import {useDebounce} from "../hooks/use-debounce.ts";
import {Input} from "@/components/ui/input.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const PostsPage = () => {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 750)
	const [posts, setPosts] = useState<PostType[]>([]);
	const [isPendingPosts, setIsPendingPosts] = useState(true);

	const filteredPosts = useMemo(() => (debouncedSearch ? posts.filter((post) =>
			post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
			|| post.body.replaceAll('\n', ' ').toLowerCase().includes(debouncedSearch.toLowerCase())
	) : posts), [debouncedSearch, posts]);

	useLayoutEffect(() => {
		getPosts().then((data) => {
			setPosts(data.posts)
		}).finally(() => {
			setIsPendingPosts(false)
		})
	}, []);

	return (
			<div className="page-shell">
				<section className="posts-layout">
					<Card className="panel">
						<CardContent className="panel__content">
							<div className="todo-summary">
								<div>
									<div className="panel__eyebrow">Content library</div>
									<h1 className="panel__title">Posts</h1>
									<p className="panel__description">
										Поиск и просмотр материалов в более плотной и читаемой сетке.
									</p>
								</div>
								<div className="search-field">
									<Search className="search-field__icon"/>
									<Input
											placeholder="Поиск постов"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											className="search-field__input"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="panel panel--dark">
						<CardContent className="sidebar-panel__content">
							<p className="sidebar-panel__label">Overview</p>
							<div className="sidebar-metric">
								<div>
									<p className="sidebar-metric__value">{posts.length}</p>
									<p className="sidebar-metric__text">Всего постов</p>
								</div>
								<div className="sidebar-divider"/>
								<div>
									<p className="sidebar-metric__value">{filteredPosts.length}</p>
									<p className="sidebar-metric__text">Найдено сейчас</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				<div className="posts-grid">
					{isPendingPosts ? (
							[...Array(8)].map((_, i) => (
									<Skeleton key={i} className="loading-card loading-card--medium"/>
							))
					) : !filteredPosts.length ? (
							<Card className="panel">
								<CardContent className="empty-panel">
									Постов по запросу {debouncedSearch} не найдено
								</CardContent>
							</Card>
					) : filteredPosts.map((post) => (
							<Card key={post.id} className="panel">
								<CardHeader className="panel__header">
									<div className="post-card__header">
										<div className="icon-box">
											<FileText className="app-brand__icon"/>
										</div>
										<div>
											<p className="post-card__id">Post #{post.id}</p>
											<CardTitle className="post-card__title">{post.title}</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent className="panel__content">
									<p className="post-card__text">{post.body}</p>
									<Link to={`/posts/${post.id}`} className="post-card__link">
										Открыть пост
										<ArrowRight className="link-icon"/>
									</Link>
								</CardContent>
							</Card>
					))}
				</div>
			</div>
	);
};

export default PostsPage;
