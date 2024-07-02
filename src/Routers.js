import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Page from "./components/page";
import { getUser } from "./redux/userReducer";

function Routers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_TOKEN);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getUser());
    }
  }, [token]);
  return (
    <div>
      <Routes>
        <Route index element={<Page />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Routers;
