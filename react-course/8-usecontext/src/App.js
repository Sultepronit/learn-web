// npm i react-router-dom -S
// npm i react-router-dom@5.2.0 !!!!!!
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// npm i date-fns -S
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data]);

  /* useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch(err) {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.responce.headers);
        } else {
          console.error(err);
        }
      }
    }
    fetchPosts();
  }, []); */

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      post.body.toLowerCase().includes(search.toLowerCase())
      || post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      //console.log(response);  
      const allPosts = [ ...posts, newPost ];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch(err) {
      console.error(err);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.put('/posts/' + id, updatedPost);
      console.log(response);
      setPosts(posts.map(post => post.id === id ? updatedPost : post));
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete('/posts/' + id);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/');
    } catch(err) {
      console.error(err);
    }
  }
  
  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path="/" element={
            <Home
              /* posts={posts} */
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          } />
          <Route path="/post" element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          } />
          <Route path="/edit/:id" element={
            <EditPost 
              posts={posts}
              handleEdit={handleEdit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          } />
          <Route path="/post/:id" element={
            <PostPage posts={posts} handleDelete={handleDelete} />
          } />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
