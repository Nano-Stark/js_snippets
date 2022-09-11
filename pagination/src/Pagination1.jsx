import { useState, useEffect } from "react";
import { getPostsPage } from "./api/axios";
import Post from "./Post";

const Pagination1 = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsPage(page).then((data) => setPosts(data));
  }, [page]);

  const content = posts.map((post) => <Post key={post.id} post={post} />);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  return (
    <>
      <nav>
        <button onClick={prevPage} disabled={page === 1}>
          Prev Page
        </button>
        <h3>{page}</h3>
        <button onClick={nextPage} disabled={!posts.length}>
          Next Page
        </button>
      </nav>
      {content}
    </>
  );
};

export default Pagination1;
