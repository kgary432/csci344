import React from "react";

export default function Suggestion({ user }) {
  return (
    <section className="flex justify-between items-center mb-4 gap-2">
      <img
        src={user.thumb_url}
        className="rounded-full"
        alt={`${user.username}'s profile picture`}
      />
      <div className="w-[180px]">
        <p className="font-bold text-sm">{user.username}</p>
        <p className="text-gray-700 text-xs">suggested for you</p>
      </div>
      <p className="text-blue-700 text-sm py-2">follow</p>
    </section>
  );
}
