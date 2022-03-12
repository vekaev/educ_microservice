const CommentList = ({ comments }) => (
	<ul>{Object.values(comments).map(comment => {
		return <li key={comment.id}>{comment.status} - {comment.content}</li>
	})}</ul>
);

export default CommentList;
