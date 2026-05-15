import {Link, useParams} from "react-router";
import {useLayoutEffect, useState} from "react";
import type {PostType} from "../types/post.ts";
import {getPostById} from "../utils/api/requests/get-post-by-id.ts";
import type {CommentType} from "../types/comment.ts";
import {getCommentsForPostId} from "../utils/api/requests/get-comments-for-post-id.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";

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
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
				{isPendingPost ? (
						<h1 className="text-2xl font-semibold text-slate-950">Загрузка поста...</h1>
				) : (
						<Card className="border-white/70 bg-white/85 shadow-[0_24px_60px_-30px_rgba(30,41,59,0.35)]">
							<CardContent className="space-y-6 p-8">
								<div className="text-sm font-medium text-slate-400">Post #{postId}</div>
								<h1 className="text-3xl font-semibold tracking-tight text-slate-950">{post?.title}</h1>
								<p className="max-w-3xl text-base leading-7 text-slate-600">{post?.body}</p>

								<div className="grid gap-4">
									{comments.map((comment) => (
											<Card key={comment.id} className="border-slate-200 bg-slate-50/85">
												<CardContent className="space-y-2 p-5">
													<h4 className="font-semibold text-slate-950">
														{comment.name}
													</h4>
													<p className="text-sm text-slate-500">
														{comment.email}
													</p>
													<p className="text-sm leading-6 text-slate-600">{comment.body}</p>
												</CardContent>
											</Card>
									))}
								</div>
							</CardContent>
						</Card>
				)}

				<Card className="border-white/70 bg-white/85">
					<CardContent className="space-y-3 p-6">
						<h4 className="text-lg font-semibold text-slate-950">Топ постов за неделю</h4>
						{[1, 2, 3, 4, 5].map((id) => (
								<p key={id} className="text-sm text-slate-600">
									<Link to={`/posts/${id}`} className="font-medium text-slate-950 underline underline-offset-4">
										POST #{id}
									</Link>
								</p>
						))}
					</CardContent>
				</Card>
			</div>
	);
};

export default PostDetailsPage;
