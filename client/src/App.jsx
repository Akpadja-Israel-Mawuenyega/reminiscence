import { useState, useEffect, useRef } from "react";
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
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behaviour: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="app min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 p-4 max-w-7xl mx-auto w-full">
        <div className="w-full md:flex-1 border rounded-lg p-4 bg-white/80">
          <Posts setCurrentId={setCurrentId} />
          {/* Scroll to form button - visible on small screens only */}
          <div className="fixed bottom-4 right-4 md:hidden z-50">
            <button
              onClick={scrollToForm}
              className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            >
              Scroll to form
            </button>
          </div>
        </div>
        <div
          ref={formRef}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg p-4 bg-white"
        >
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
}

export default App;
