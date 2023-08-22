// npm i react-router-dom -S
// npm i react-router-dom@5.2.0 !!!!!!
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// npm i date-fns -S
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'first',
      datetime: '29/07/2023',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      title: 'second',
      datetime: '30/07/2023',
      body: 'Asperiores voluptate iusto natus obcaecati aliquam aperiam culpa perferendis repellat nam quaerat.'
    },
    {
      id: 3,
      title: 'third',
      datetime: '31/07/2023',
      body: 'Ostrum deserunt veniam rem corrupti. Id illum aspernatur suscipit aliquam!'
    }
  ]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      post.body.toLowerCase().includes(search.toLowerCase())
      || post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [ ...posts, newPost ];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    navigate('/');
  }
  
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={
          <Home /* posts={posts} */ posts={searchResults} />
        } />
        <Route path="/post" element={<NewPost
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        />} />
        <Route path="/post/:id" element={
          <PostPage posts={posts} handleDelete={handleDelete} />
        } />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
