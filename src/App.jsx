import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import OneArticle from "./components/OneArticle";

function App() {
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState("tickle122");

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={<Articles article={article} setArticle={setArticle} />}
        />
        <Route
          path="/:article_id"
          element={<OneArticle article={article} user={user} />}
        />
      </Routes>
    </>
  );
}
export default App;
