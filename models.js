// models.js

class Post {
    constructor(id, author, text, date) {
      this.id = id;
      this.author = author;
      this.text = text;
      this.date = date;
    }
  }
  
  class User {
    constructor(id, name, bio) {
      this.id = id;
      this.name = name;
      this.bio = bio;
    }
  }
  
  const users = [
    new User(1, 'James', 'I like dogs.'),
    new User(2, 'Rose', 'I enjoy swimming.'),
  ];
  
  const posts = [
    new Post(1, users[0], 'Hello, world!', new Date()),
    new Post(2, users[1], 'This is a test post.', new Date()),
  ];
  