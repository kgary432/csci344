import React from "react";
export function Welcome({ name, imgUrl }) {
  return (
    <section className="card">
      <h2>Hello, {name}</h2>
      <img src={imgUrl} />
    </section>
  );
}
