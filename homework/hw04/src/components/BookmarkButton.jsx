import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests.jsx";

export default function Bookmark({ token, bookmarkId, postId }) {
  const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

  async function createBookmark() {
    const sendData = {
      post_id: postId,
    };
    const response = await postDataToServer(token, "/api/bookmarks/", sendData);
    console.log(response);
    setStateBookmarkId(response.id);
  }

  async function deleteBookmark() {
    const response = await deleteDataFromServer(
      token,
      "api/bookmarks/" + stateBookmarkId
    );
    console.log(response);
    setStateBookmarkId(null);
  }

  if (stateBookmarkId) {
    return (
      <button
        onClick={deleteBookmark}
        aria-label="unbookmark"
        aria-checked="true"
      >
        <i className="fas fa-bookmark"> </i>
      </button>
    );
  }
  return (
    <button onClick={createBookmark} aria-label="bookmark" aria-checked="false">
      <i className="far fa-bookmark"> </i>
    </button>
  );
}
