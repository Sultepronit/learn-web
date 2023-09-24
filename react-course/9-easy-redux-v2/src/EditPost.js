import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

function EditPost() {
    const navigate = useNavigate();
    const { id } = useParams();

    const postTitle = useStoreState(state => state.postTitle);
    const postBody = useStoreState(state => state.postBody);

    const editPost = useStoreActions(actions => actions.editPost);
    const setPostTitle = useStoreActions(actions => actions.setPostTitle);
    const setPostBody = useStoreActions(actions => actions.setPostBody);

    const getPostById = useStoreState(state => state.getPostById);
    const post = getPostById(id);

    useEffect(() => {
        if(post) {
            setPostTitle(post.title);
            setPostBody(post.body);
        }
    }, [post, setPostTitle, setPostBody]);

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: postTitle, datetime, body: postBody };
        editPost(updatedPost);
        navigate('/post/' + id);
    }

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
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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