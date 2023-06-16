// A higher order function takes function as argument (parameter)
// add/or returns a function

import { posts } from './posts.js';
posts.forEach((post) => {
    console.log(post);
});
console.clear();

// retruns array of posts with userId === 1
const filteredPosts = posts.filter(post => {
    return post.userId === 1;
});
console.log(filteredPosts);

// returns array of post.id * 10
const mappedPosts = filteredPosts.map(post => {
    return post.id * 10;
});
console.log(mappedPosts);

// returns sum of mappedPosts items
const reducedValue = mappedPosts.reduce((sum, post) => {
    return sum + post;
});
console.log(reducedValue);