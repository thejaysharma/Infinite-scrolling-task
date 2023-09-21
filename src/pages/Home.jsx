import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  //Fetching the data from the api
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
        );
        setData(response.data);
        setPage(page + 1);
        console.log(response.data);
        console.log(data.length);
      } catch (error) {
        setError(error);
      }
    };
    fetchApiData();
  }, []);

  //Fetching the next 10 data from the api
  const fetchData = async () => {
    setPage(page + 1);
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
        );
        setTimeout(() => {
          setData([...data, ...response.data]);
        }, 1000);
      } catch (error) {
        setError(error);
      }
    };
    fetchApiData();
  };

  return (
    <div className="mt-10">
      {/* Displaying the data */}
      <div className="flex flex-col justify-center gap-8">
        {data &&
          data.map((item, index) => {
            return (
              <Link
                to={`/product-detail/${item.id}`}
                onClick={() => {
                  localStorage.setItem(
                    "item",
                    JSON.stringify({
                      id: item.id,
                      name: item.name,
                      image_url: item.image_url,
                      description: item.description,
                    })
                  );
                }}
              >
                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                  <div className=" text-white w-12 h-12 flex justify-center absolute rounded-[100%] items-center shadow-xl bg-orange-500 -left-3 -top-3">
                    {index + 1}
                  </div>
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
              </Link>
            );
          })}

        {/* Loading the next 10 data for the next page */}
        {data && (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={true}
            loader={
              <div class="flex gap-2 justify-center items-center mb-5">
                <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
                <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
              </div>
            }
          ></InfiniteScroll>
        )}
      </div>
    </div>
  );
}
