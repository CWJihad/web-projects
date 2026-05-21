import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  // we can also use like this or make it custom hooks in this folder or another folder when need import it
  const [products, SetProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // steps to cancel or ignore unused or useless api responses
    // step 1
    const controller = new AbortController(); // to avoiding race case condition
    
    ;(async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get("/api/products?search="+search, {
          signal: controller.signal // step 2
        });

        console.log(res.data);
        SetProducts(res.data);
        setLoading(false);
      } catch (error) {
        // step 3
        if (axios.isCancel(error)) { // previous or unused api response comes here. So, we should handle them
          console.log('Request Cancelled', error.message);
          return
        }
        setError(true);
        setLoading(false);
      }
    })();

    // step 4 clean up
    return () => {controller.abort()} // also called it cleanup method
    
    
  }, [search]);

  // const [products, error, loading] = customReactQuery('/api/products') // order is a matter

  /*
  if (error) {
    return (
      <h1 style={{ color: "red", fontWeight: "bold" }}>
        Something went wrong!!
      </h1>
    );
  }

  if (loading) {
    return (
      <h1 style={{ color: "indigo", fontWeight: "bold" }}>Loading.......</h1>
    );
  }
  */

  return (
    <div>
      <h1>Advance Api Handling with react</h1>

      <input 
      type="text"
      placeholder="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      
      
       />
      
      {/* 1st way */}
      {/* {loading  ? <h1>Loading.......</h1> : <h2>Number of Products are: {products.length}</h2>}
      {error && <h1>
        Something went wrong!!
      </h1>} */}

      {/* 2nd way */}
      {loading ? (loading ? <h1>Loading.......</h1> : <h2>Number of Products are: {products.length}</h2>) : (error ? <h2 style={{color: 'red'}}>Something went wrong!!!</h2> : <h2>Number of Products are: {products.length}</h2>) }

      {/* 3rd way */}
      {/* <h2>Number of Products are: {products.length}</h2> */}
    </div>
  );
};

export default App;

// this our edge cases
// this is so important and every production great project use it as a custom hooks
function customReactQuery(urlPath) {
  const [products, SetProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(urlPath);

        console.log(res.data);
        SetProducts(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  // order is a matter
  return [products, error, loading]; // you can pass it as an array or object
}
