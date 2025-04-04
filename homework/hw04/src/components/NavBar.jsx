import React from "react";

export default function NavBar({ username }) {
  function signOut() {
    alert("Jarvis, nuke this guy for me");
  }
  // This component is implemented for you:
  return (
    <nav className="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
      <h1 className="font-Comfortaa font-bold text-2xl">Photo App</h1>
      <ul className="flex gap-4 text-sm items-center justify-center">
        <li>
          <span>{username}</span>
        </li>
        <li>
          <button className="text-blue-700 py-2" onClick={signOut}>
            Sign Out{" "}
          </button>
        </li>
      </ul>
    </nav>
  );
}
