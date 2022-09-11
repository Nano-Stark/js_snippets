import { useState } from "react";
import "./App.css";
import Pagination1 from "./Pagination1";
import Pagination2 from "./Pagination2";

function App() {
  const [pagination, setPagination] = useState(0);
  return (
    <>
      <button
        style={{ position: "fixed", bottom: "0", left: "0" }}
        onClick={() => setPagination((prev) => !prev)}
      >
        Pagination Type: {pagination + 1}
      </button>
      {pagination ? <Pagination2 /> : <Pagination1 />}
    </>
  );
}

export default App;
