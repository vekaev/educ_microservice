import axios from 'axios';
import {useState} from "react";

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://my-proxy.com/posts/create', { title });

        setTitle('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                />
            </div>
            <button className="btn btn-primary mt-2" type="submit">Submit</button>
        </form>
    </div>
}

export default PostCreate;
