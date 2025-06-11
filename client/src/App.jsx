// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { getPosts } from "./actions/actions";
import Posts from "./components/Posts/Posts";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <div className="flex justify-between p-4">
        <div className="flex-1 mr-4 border  rounded-lg p-4 bg-white/80">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="w-1/2 border border-gray-300 rounded-lg p-4 bg-white">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
}

export default App;
