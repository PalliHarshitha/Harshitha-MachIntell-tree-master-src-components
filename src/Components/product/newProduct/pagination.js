import React, {useEffect, useState} from 'react';
import axios from  "axios";
import Posts from  './post';
import PaginationMainCode from './paginationMainCode';

function Pagination() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(10); // Number of posts per page.

    useEffect (() => {
        const fetchPosts = async ()  => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    console.log(posts);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change  page
    const  paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div aria-label='pagination'>
        <Posts posts={currentPosts} loading={loading} />
        <PaginationMainCode postsperPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  )
}

export default Pagination