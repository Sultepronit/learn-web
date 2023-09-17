import { useParams, Link } from "react-router-dom";
import { useContext } from 'react';
import DataContext from "./context/DataContext";

function PostPage() {
  const { posts, handleDelete } = useContext(DataContext);

  const { id } = useParams(); // from url
  const post = posts.find(post => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={'/edit/' + id}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>
              <Link to='/'>Return to Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage;