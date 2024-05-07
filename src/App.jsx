import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";

function App() {
  const [article, setArticle] = useState([]);

  return (
    <div>
      <Header />
      <br />
      <Articles article={article} setArticle={setArticle} />
    </div>
  );
}

export default App;
