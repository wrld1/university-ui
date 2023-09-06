import { RouterProvider } from "react-router-dom";
import routerRoot from "./routes/root";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              border: "1px solid green",
            },
          },
          error: {
            style: {
              border: "1px solid red",
            },
          },
        }}
      />
      <RouterProvider router={routerRoot} />
    </>
  );
}

export default App;
