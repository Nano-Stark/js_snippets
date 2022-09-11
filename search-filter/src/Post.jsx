const Post = ({ post }) => {
  return (
    <article className="post__article">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </article>
  );
};

export default Post;
