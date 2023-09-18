import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// npm i date-fns -S
import { format } from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data]);


    useEffect(() => {
        const filteredResults = posts.filter(post => 
        post.body.toLowerCase().includes(search.toLowerCase())
        || post.title.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

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
        <DataContext.Provider value={{
            search, setSearch, 
            searchResults, fetchError, isLoading,
            postTitle, setPostTitle, postBody, setPostBody,
            posts, setPosts, handleEdit, handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
export { DataProvider };