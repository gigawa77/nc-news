import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import OneArticle from "./components/OneArticle";

function App() {
  const [article, setArticle] = useState([]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Articles article={article} setArticle={setArticle} />}
        />
        <Route path="/:article_id" element={<OneArticle article={article} />} />
      </Routes>
    </>
  );
}
export default App;
