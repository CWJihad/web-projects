import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Github = () => {
  const data = useLoaderData()

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://api.github.com/users/cwjihad")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     });
  // }, []);

  return (
    <div className="m-2 ">
      <div className="flex w-[85%] rounded  justify-around p-8 mx-auto text-gray-300  bg-gray-700">
        <img className="object-cover rounded-full w-1/4 shadow-2xl drop-shadow-2xl" src={data.avatar_url} alt="" />
        <h2>Github Followers: {data.followers > 100 ? data.followers : 100}</h2>
      </div>
    </div>
  );
};

export default Github;

// export const GithubInfoLoader = async () => {

//   const res = await fetch('https://api.github.com/users/cwjihad')
  
//   return res.json()
  
  
// }
