import { useRef, useCallback } from "react";
import Post from "./Post";
import { useInfiniteQuery } from "react-query";
import { getPostsPage } from "./api/axios";

const Scroll2 = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery(
    "/posts",
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef();
  const lastPostref = useCallback(
    (post) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((post) => {
        // console.log("post", post);
        if (post[0].isIntersecting && hasNextPage) {
          console.log("near last post");
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error") return <p>Error: {error.message}</p>;

  const content = data?.pages.map((pg) => {
    return pg.map((post, i) => {
      if (pg.length === i + 1) {
        //   console.log("last element");
        return <Post ref={lastPostref} key={post.id + i} post={post} />;
      }
      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <>
      <h1 id="top">&infin; Ex2. Scroll Infinity - React-Query &infin; </h1>
      {content}
      {isFetchingNextPage && <p>Loading more Posts...</p>}
      <p>
        <a href="#top">Back to top</a>
      </p>
    </>
  );
};

export default Scroll2;
