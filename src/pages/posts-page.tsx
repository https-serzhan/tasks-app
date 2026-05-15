import {useLayoutEffect, useMemo, useState} from "react";
import type {PostType} from "../types/post.ts";
import {getPosts} from "../utils/api/requests/get-posts.ts";
import {Link} from "react-router";
import {useDebounce} from "../hooks/use-debounce.ts";
import {Input} from "@/components/ui/input.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Search} from "lucide-react";

const PostsPage = () => {
	const [search, setSearch] = useState('');
	const debounced_search = useDebounce(search, 750)
	const [posts, setPosts] = useState<PostType[]>([]);
	const [isPendingPosts, setIsPendingPosts] = useState(true);

	const filteredPosts = useMemo(() => (debounced_search ? posts.filter((post) =>
			post.title.toLowerCase().includes(debounced_search.toLowerCase())
			|| post.body.replaceAll('\n', ' ').toLowerCase().includes(debounced_search.toLowerCase())
	) : posts), [debounced_search, posts]);

	useLayoutEffect(() => {
		getPosts().then((data) => {
			setPosts(data.posts)
		}).finally(() => {
			setIsPendingPosts(false)
		})
	}, []);

	return (
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
				<div className="relative">
					<Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400"/>
					<Input
							placeholder="Поиск постов"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="h-12 border-white/70 bg-white/85 pl-11 shadow-sm"
					/>
				</div>
				<div className="grid gap-4">
					{isPendingPosts ? (
							[...Array(10)].map((_, i) => (
									<Skeleton key={i} className="h-32 rounded-3xl bg-white/70"/>
							))
					) : !filteredPosts.length ? (
							<Card className="border-white/70 bg-white/85">
								<CardContent className="p-6 text-lg font-medium text-slate-600">
									Постов по запросу {debounced_search} не найдено
								</CardContent>
							</Card>
					) : filteredPosts.map((post) => (
							<Card key={post.id} className="border-white/70 bg-white/85 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)]">
								<CardContent className="space-y-4 p-6">
									<div className="text-sm font-medium text-slate-400">Post #{post.id}</div>
									<h2 className="text-xl font-semibold text-slate-950">{post.title}</h2>
									<p className="line-clamp-3 text-sm leading-6 text-slate-600">{post.body}</p>
									<div>
										<Link to={`/posts/${post.id}`} className="font-medium text-slate-950 underline underline-offset-4">
											Читать пост
										</Link>
									</div>
								</CardContent>
							</Card>
					))}
				</div>
			</div>
	);
};

export default PostsPage;
