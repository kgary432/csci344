import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests.jsx";

export default function Like({ token, likeId, postId }) {
  const [stateLikeId, setStateLikeId] = useState(likeId);

  async function createLike() {
    const sendData = {
      post_id: postId,
    };
    const response = await postDataToServer(token, "/api/likes/", sendData);
    console.log(response);
    setStateLikeId(response.id);
  } // end of createLike

  async function deleteLike() {
    const response = await deleteDataFromServer(
      token,
      "api/likes/" + stateLikeId
    );
    console.log(response);
    setStateLikeId(null);
  } // end of deleteLike

  if (stateLikeId) {
    return (
      <button onClick={deleteLike} aria-label="unlike" aria-checked="true">
        <i className="fas text-red-700 fa-heart"> </i>
      </button>
    );
  } else {
    return (
      <button onClick={createLike} aria-label="like" aria-checked="false">
        <i className="far fa-heart"> </i>
      </button>
    );
  }
}
