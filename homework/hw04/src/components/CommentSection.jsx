import { useState } from "react";
import React from "react";

export default function CommentSection({ comments }) {
  const [expand, setExpand] = useState(false); // State to track if comments are expanded

  const expandComments = () => {
    setExpand(true); // Set expand to true when the button is clicked
  };

  const lastComment = comments[comments.length - 1]; // Get the last comment

  return (
    <section className="flex flex-col gap-2">
      {expand ? (
        // Show all comments when expanded
        comments.map((comment) => (
          <>
            <p className="text-sm" key={comment.id}>
              <strong>{comment.user.username} </strong>
              {comment.text}
            </p>
            <p className="uppercase text-gray-500 text-xs">
              {comment.display_time}
            </p>
          </>
        ))
      ) : (
        // Show only the last comment when not expanded
        <>
          {lastComment && (
            <>
              <button
                onClick={expandComments}
                className="text-sm text-blue-700 width-full "
              >
                View all {comments.length} comments
              </button>
              <p className="text-sm">
                <strong>{lastComment.user.username} </strong>
                {lastComment.text}
              </p>
              <p className="uppercase text-gray-500 text-xs">
                {lastComment.display_time}
              </p>
            </>
          )}
        </>
      )}
    </section>
  );
}
