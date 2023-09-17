import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from './context/DataContext';

function EditPost() {
    const {
        posts, handleEdit, postBody, setPostBody, postTitle, setPostTitle
    } = useContext(DataContext);

    const { id } = useParams();
    const post = posts.find(post => post.id == id);

    useEffect(() => {
        if(post) {
            setPostTitle(post.title);
            setPostBody(post.body);
        }
    }, [post, setPostTitle, setPostBody]);

    return (
        <main className="NewPost">
            {postTitle &&
                <>
                    <h2>EditPost</h2>
                    <form className="newPostForm" onSubmit={e => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={postTitle}
                            onChange={e => setPostTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea 
                            id="postBody"
                            required
                            value={postBody}
                            onChange={e => setPostBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!postTitle &&
              <>
                <h2>Post Not Found</h2>
                <p>
                  <Link to='/'>Return to Homepage</Link>
                </p>
              </>
            }
        </main>
    )
}


export default EditPost;