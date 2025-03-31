import React from "react";
import NavBar from "./NavBar";
import { Image } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import { useState } from "react";

// custom components:

const IconSlider = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0);
  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? "" : "icon-wrapper-active";
  const nextColorCls = value >= mid ? "icon-wrapper-active" : "";
  return (
    <div className="icon-wrapper">
      <FrownOutlined className={preColorCls} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined className={nextColorCls} />
    </div>
  );
};

export default function App() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen max-w-[1000px] mt-24 mx-auto">
        <h2 className="font-Comfortaa my-4 font-bold text-xl">Photo Gallery</h2>
        <div className="flex flex-wrap content-start">
          <Image src="https://picsum.photos/600/600?id=1" width={200} />
          <Image src="https://picsum.photos/600/600?id=2" width={200} />
          <Image src="https://picsum.photos/600/600?id=3" width={200} />
          <Image src="https://picsum.photos/600/600?id=4" width={200} />
          <Image src="https://picsum.photos/600/600?id=5" width={200} />
          <Image src="https://picsum.photos/600/600?id=6" width={200} />
          <Image src="https://picsum.photos/600/600?id=7" width={200} />
          <Image src="https://picsum.photos/600/600?id=8" width={200} />
          <Image src="https://picsum.photos/600/600?id=9" width={200} />
          <Image src="https://picsum.photos/600/600?id=10" width={200} />
        </div>
        <IconSlider min={0} max={20} />
      </main>

      <footer className="p-5 bg-white">footer goes here</footer>
    </>
  );
}
