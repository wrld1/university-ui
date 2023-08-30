import { RouterProvider } from "react-router-dom";
import routerRoot from "./routes/root";

function App() {
  return (
    <>
      <RouterProvider router={routerRoot} />
    </>
  );
}

export default App;
