import "./App.css";
import { getData } from "./api/axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ListPage from "./ListPage";
import useSearch from "./useSearch";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useSearch();

  useEffect(() => {
    getData()
      .then((data) => {
        setPosts(data);
        return data;
      })
      .then((data) => {
        setSearchResults(data);
      });
  }, []);

  return (
    <>
      <SearchBar posts={posts} setSearchResults={setSearchResults} />
      <ListPage searchResults={searchResults} />
    </>
  );
}

export default App;
