import React from "react";
import { Welcome } from "./Welcome";
export default function App() {
  return (
    <>
      <header>
        <h1>My First App</h1>
      </header>
      <main>
        <Welcome name="Kate" imgUrl="https://picsum.photos/200?a=b" />
        <Welcome name="React" imgUrl="https://picsum.photos/200?a!=b" />
        <Welcome name="Elias" imgUrl="https://picsum.photos/200?a<b" />
      </main>
    </>
  );
}
