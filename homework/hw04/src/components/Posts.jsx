import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Posts({ token }) {
  // useState is a function that takes the inital value of a variable as an argument
  // when useState is invoked, it returns an array with two values
  // first, the state variable itself: post
  // second, a function whose job is to set the state varaible and then draw the screen after the variable is set
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);

  function addOneToCounter() {
    setCounter(counter + 1);
  }
  async function getPosts() {
    const data = await getDataFromServer(token, "/api/posts");
    console.log(data);
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      TODO: output all of the posts: {posts.length}
      {posts.map((post) => (
        <div>{post.caption}</div>
      ))}
      <br />
      <button onClick={addOneToCounter}>{counter}</button>
    </div>
  );
}
