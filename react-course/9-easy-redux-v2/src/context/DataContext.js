import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

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

    return (
        <DataContext.Provider value={{
            search, setSearch, searchResults,
            fetchError, isLoading,
            postTitle, setPostTitle, postBody, setPostBody,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
export { DataProvider };