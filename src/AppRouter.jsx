import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo1 from "./pages/Demo1";
import Demo2 from "./pages/Demo2";
import Home from "./pages/Home";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact key={0} path={`/`} element={<Home />} />
        <Route key={1} path={`demo1`} element={<Demo1 />} />
        <Route key={2} path={`demo2`} element={<Demo2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
