import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import TagsPage from '../components/tags/TagsPage';


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/tags" element={<TagsPage />} />  // Usage of 'TagsPage'
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}

        </Route>
      </Routes>
    </>
  );
};

