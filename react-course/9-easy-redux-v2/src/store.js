import { createStore, action, thunk, computed } from 'easy-peasy';
import api from './api/posts';

export default createStore({
    posts: [],
    setPosts: action((state, playload) => {
        state.posts = playload;
    }),
    postTitle: '',
    setPostTitle: action((state, playload) => {
        state.postTitle = playload;
    }),
    postBody: '',
    setPostBody: action((state, playload) => {
        state.postBody = playload;
    }),
    search: '',
    setSearch: action((state, playload) => {
        state.search = playload;
    }), 
    searchResults: [],
    setSearchResults: action((state, playload) => {
        state.searchResults = playload;
    }), 
    postCount: computed(state => state.posts.length),
    getPostById: computed(state => {
        return id => state.posts.find(post => post.id == id);
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
            const response = api.post('/posts', newPost);
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle('');
            actions.setPostBody('');
        } catch (error) {
            console.log(error);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        try {
            await api.delete('/posts/' + id)   ;
            actions.setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.log(error);
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        try {
            const response = await api.put('/posts/'+id, updatedPost);
            actions.setPosts(posts.map(post => post.id === id ? response.data : post));
            actions.setPostTitle('');
            actions.setPostBody('');
        } catch (error) {
            console.log(error);
        }
    })
});