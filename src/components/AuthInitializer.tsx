import { useEffect } from "react";
import Cookies from "js-cookie";

import { useAppDispatch } from "../app/hooks";
import { fetchProfile } from "../features/auth/authSlice";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;