import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import AadhaarOCR from "./pages/AadhaarOCR";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<AadhaarOCR />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
