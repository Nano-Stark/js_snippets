import { useState, useRef, useCallback } from "react";
import usePosts from "./hooks/usePosts";
import Post from "./Post";

const Scroll1 = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);

  const intObserver = useRef();
  const lastPostref = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((post) => {
        // console.log("post", post);
        if (post[0].isIntersecting && hasNextPage) {
          console.log("near last post");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p>Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      //   console.log("last element");
      return <Post ref={lastPostref} key={post.id + i} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <>
      <h1 id="top">&infin; Ex1. Scroll Infinity - React Fix &infin; </h1>
      {content}
      {isLoading && <p>Loading more Posts...</p>}
      <p>
        <a href="#top">Back to top</a>
      </p>
    </>
  );
};

export default Scroll1;
