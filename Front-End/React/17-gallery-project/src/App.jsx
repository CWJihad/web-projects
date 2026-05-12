import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState([]);
  
  const [page, setPage] = useState(1);

  const [show, setShow] = useState("none");

  const getData = async () => {
    const res = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=21`,
    );

    setUserData(res.data);
    setShow("flex")
  };

  const nextPage = () => {
    if (page < 5) {
      setUserData([])
      setShow("none")
      setPage(page+1)
    }
  }
  const prevPage = () => {
    if (page > 1) {
      setUserData([])
      setShow("none")
      setPage(page-1)
    }
    
  }
  
  useEffect(() => {
    getData()   
  }, [page])

  let printUserData = <h3 className="text-gray-300 absolute left-1/2 top-1/2 font-semibold">Loading......</h3>

  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => {
      return (
        <div key={idx}>
          <a href={elem.url} target="_blank">
            <div className="h-40 w-44 rounded">
              <img
                className="h-full w-full rounded shadow-2xl"
                src={elem.download_url}
                alt="img"
              />
            </div>
          </a>
        </div>
      );
    });
  }


  return (
    <div className="bg-gray-900 text-white h-screen p-4 overflow-auto">
        <h1 className="text-white font-bold text-center text-2xl">
          Image Gallery
        </h1>

      <div className="">
        <div className=" mt-5 flex flex-wrap gap-5 justify-center items-center">
          {printUserData}
        </div>
      </div>

      <div  style={{display: show}} className="justify-center items-center
       mt-5 gap-5">
        <button onClick={prevPage} className="bg-gray-600 px-8 py-1 rounded font-semibold hi text-gray-300 cursor-pointer active:scale-95">Prev</button>
        <h4>Page: {page}</h4>
        <button onClick={nextPage} className="bg-gray-600 px-8 py-1 rounded font-semibold text-gray-300 cursor-pointer active:scale-95">Next</button>
      </div>
    </div>
  );
};

export default App;
