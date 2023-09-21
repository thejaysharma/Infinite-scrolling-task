import React from "react";

export default function ProductDetails() {
  const item = JSON.parse(localStorage.getItem("item"));
  console.log(item);
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          <img src={item.image_url} className="rounded-xl h-80" />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <h3 className="font-black text-gray-800 md:text-3xl text-xl mb-6">
            {item.name}
          </h3>
          <p className="md:text-lg text-gray-500 text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
