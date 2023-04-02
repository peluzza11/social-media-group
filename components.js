// components.js

function Post({ post }) {
    return (
      <div className="post">
        <h2>{post.author.name}</h2>
        <p>{post.text}</p>
        <span>{post.date.toLocaleString()}</span>
      </div>
    );
  }
  
  function Profile({ user }) {
    return (
      <div className="profile">
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </div>
    );
  }
  
  function Search({ onChange }) {
    return (
      <div className="search">
        <input type="text" onChange={onChange} />
      </div>
    );
  }
  