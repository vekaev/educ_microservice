import {useState} from "react";
import axios from "axios";


const CommentCreate = ({ postId }) => {
	const [content, setContent] = useState('')

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(`http://localhost:4001/posts/${postId}/comments`, {  content })

			setContent('')
		} catch (error) {
			console.error(error.message)
		}

	}

	return <div>
		<form onSubmit={onSubmit}>
			<div className="form-group">
			<label>New Comment</label>
			<input
				className='form-control'
				type="text"
				value={content}
				onChange={({target: {value}}) => setContent(value)}
			/>
			</div>
			<button type="submit" className='btn btn-primary'>Send</button>
		</form>
	</div>
}

export default CommentCreate;
