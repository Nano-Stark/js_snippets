import Post from "./Post";

const ListPage = ({ searchResults }) => {
  const results = searchResults.map((post) => (
    <Post key={post.id} post={post} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching content</p>
    </article>
  );
  return <main className="post__list">{content}</main>;
};

export default ListPage;
