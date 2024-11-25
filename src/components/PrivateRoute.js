import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://blunido-backend.onrender.com/api/auth/isauth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsAuth(true);
      })
      .catch((error) => {
        console.log(error.response?.data);
        setIsAuth(false);
      });
  }, []);

  return <>{isAuth === false ? <Navigate to={"/login"} /> : <Outlet />}</>;
};

export default PrivateRoute;
