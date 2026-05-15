import {Link, useParams} from "react-router";
import {useLayoutEffect, useState} from "react";
import {ArrowRight, MessageSquareText, Newspaper} from "lucide-react";
import type {PostType} from "../types/post.ts";
import {getPostById} from "../utils/api/requests/get-post-by-id.ts";
import type {CommentType} from "../types/comment.ts";
import {getCommentsForPostId} from "../utils/api/requests/get-comments-for-post-id.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

const PostDetailsPage = () => {
	const {postId} = useParams()
	const [post, setPost] = useState<PostType | null>(null)
	const [comments, setComments] = useState<CommentType[]>([])
	const [loadedPostId, setLoadedPostId] = useState<string | null>(null)

	useLayoutEffect(() => {
		if (!postId) return
		void Promise.all([
			getPostById(postId),
			getCommentsForPostId(postId),
		]).then(([postData, commentsData]) => {
			setPost(postData)
			setComments(commentsData)
			setLoadedPostId(postId)
		})
	}, [postId]);

	const isPendingPost = loadedPostId !== postId;

	return (
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
				{isPendingPost ? (
						<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
							<Skeleton className="h-[380px] rounded-2xl bg-slate-200/70"/>
							<Skeleton className="h-[380px] rounded-2xl bg-slate-200/70"/>
						</div>
				) : (
						<section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
							<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
								<CardHeader className="border-b border-slate-200 pb-5">
									<div className="flex items-center gap-3">
										<div className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
											<Newspaper className="size-5 text-slate-600"/>
										</div>
										<div>
											<p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Post #{postId}</p>
											<CardTitle className="mt-1 text-3xl leading-tight">{post?.title}</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent className="p-6">
									<p className="max-w-3xl text-base leading-8 text-slate-600">{post?.body}</p>
								</CardContent>
							</Card>

							<Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.55)]">
								<CardContent className="p-6">
									<p className="text-sm font-medium text-slate-300">Comments</p>
									<div className="mt-6">
										<p className="text-5xl font-semibold text-white">{comments.length}</p>
										<p className="mt-2 text-sm text-slate-300">Комментариев к посту</p>
									</div>
									<div className="mt-8 space-y-3">
										{[1, 2, 3].map((id) => (
											<Link key={id} to={`/posts/${id}`} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
												<span>Post #{id}</span>
												<ArrowRight className="size-4"/>
											</Link>
										))}
									</div>
								</CardContent>
							</Card>
						</section>
				)}

				<Card className="rounded-2xl border-slate-200 bg-white shadow-[0_18px_36px_-28px_rgba(15,23,42,0.22)]">
					<CardHeader className="border-b border-slate-200 pb-4">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
								<MessageSquareText className="size-4 text-slate-600"/>
							</div>
							<CardTitle className="text-xl">Комментарии</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-3 p-4 sm:p-6">
						{comments.map((comment) => (
								<div key={comment.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
									<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
										<h4 className="font-semibold text-slate-950">{comment.name}</h4>
										<p className="text-sm text-slate-500">{comment.email}</p>
									</div>
									<p className="mt-3 text-sm leading-7 text-slate-600">{comment.body}</p>
								</div>
						))}
					</CardContent>
				</Card>
			</div>
	);
};

export default PostDetailsPage;
