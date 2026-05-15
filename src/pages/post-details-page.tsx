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
			<div className="page-shell">
				{isPendingPost ? (
						<div className="details-layout">
							<Skeleton className="loading-card loading-card--tall"/>
							<Skeleton className="loading-card loading-card--tall"/>
						</div>
				) : (
						<section className="details-layout">
							<Card className="panel">
								<CardHeader className="panel__header">
									<div className="post-card__header">
										<div className="icon-box">
											<Newspaper className="app-brand__icon"/>
										</div>
										<div>
											<p className="post-card__id">Post #{postId}</p>
											<CardTitle className="panel__title panel__title--sm">{post?.title}</CardTitle>
										</div>
									</div>
								</CardHeader>
								<CardContent className="panel__content">
									<p className="panel__description">{post?.body}</p>
								</CardContent>
							</Card>

							<Card className="panel panel--dark">
								<CardContent className="sidebar-panel__content">
									<p className="sidebar-panel__label">Comments</p>
									<div className="sidebar-metric">
										<p className="sidebar-metric__value">{comments.length}</p>
										<p className="sidebar-metric__text">Комментариев к посту</p>
									</div>
									<div className="details-sidebar__links">
										{[1, 2, 3].map((id) => (
											<Link key={id} to={`/posts/${id}`} className="details-sidebar__link">
												<span>Post #{id}</span>
												<ArrowRight className="app-brand__icon"/>
											</Link>
										))}
									</div>
								</CardContent>
							</Card>
						</section>
				)}

				<Card className="panel">
					<CardHeader className="panel__header">
						<div className="post-card__header">
							<div className="icon-box">
								<MessageSquareText className="app-brand__icon"/>
							</div>
							<CardTitle className="list-panel__title">Комментарии</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="comment-list">
						{comments.map((comment) => (
								<div key={comment.id} className="comment-card">
									<div className="comment-card__header">
										<h4 className="comment-card__title">{comment.name}</h4>
										<p className="comment-card__email">{comment.email}</p>
									</div>
									<p className="comment-card__text">{comment.body}</p>
								</div>
						))}
					</CardContent>
				</Card>
			</div>
	);
};

export default PostDetailsPage;
