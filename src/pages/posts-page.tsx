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
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
				<section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
					<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
						<CardContent className="p-6 sm:p-7">
							<div className="flex flex-col gap-5">
								<div>
									<div className="mb-3 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
										Content library
									</div>
									<h1 className="text-3xl font-semibold tracking-tight text-slate-950">Posts</h1>
									<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
										Поиск и просмотр материалов в более плотной и читаемой сетке.
									</p>
								</div>
								<div className="relative max-w-2xl">
									<Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400"/>
									<Input
											placeholder="Поиск постов"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											className="h-12 rounded-lg border-slate-200 bg-slate-50 pl-11"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)]">
						<CardContent className="p-6">
							<p className="text-sm font-medium text-slate-300">Overview</p>
							<div className="mt-6 space-y-4">
								<div>
									<p className="text-4xl font-semibold text-white">{posts.length}</p>
									<p className="mt-1 text-sm text-slate-300">Всего постов</p>
								</div>
								<div className="h-px bg-white/10"/>
								<div>
									<p className="text-4xl font-semibold text-white">{filteredPosts.length}</p>
									<p className="mt-1 text-sm text-slate-300">Найдено сейчас</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				<div className="grid gap-4 lg:grid-cols-2">
					{isPendingPosts ? (
							[...Array(8)].map((_, i) => (
									<Skeleton key={i} className="h-52 rounded-2xl bg-slate-200/70"/>
							))
					) : !filteredPosts.length ? (
							<Card className="rounded-2xl border-slate-200 bg-white lg:col-span-2">
								<CardContent className="p-8 text-base font-medium text-slate-600">
									Постов по запросу {debouncedSearch} не найдено
								</CardContent>
							</Card>
					) : filteredPosts.map((post) => (
							<Card key={post.id} className="rounded-2xl border-slate-200 bg-white shadow-[0_12px_24px_-20px_rgba(15,23,42,0.18)]">
								<CardHeader className="border-b border-slate-200 pb-4">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
											<FileText className="size-4 text-slate-600"/>
										</div>
										<div>
											<p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Post #{post.id}</p>
											<CardTitle className="mt-1 text-xl leading-7">{post.title}</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent className="p-6">
									<p className="line-clamp-4 text-sm leading-7 text-slate-600">{post.body}</p>
									<Link to={`/posts/${post.id}`} className="mt-6 inline-flex items-center text-sm font-medium text-slate-950">
										Открыть пост
										<ArrowRight className="ml-2 size-4"/>
									</Link>
								</CardContent>
							</Card>
					))}
				</div>
			</div>
	);
};

export default PostsPage;
