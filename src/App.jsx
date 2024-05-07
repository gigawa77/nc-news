import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Articles from "./components/Articles";

function App() {
  const [article, setArticle] = useState([]);

  return (
    <div>
      <Header />
      <Articles article={article} setArticle={setArticle} />
    </div>
  );
}
export default App;
