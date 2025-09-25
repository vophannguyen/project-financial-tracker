import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import "./Root.less";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import Login from "../features/auth/Login";

export default function Root() {
  const token = useSelector(selectToken);
  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}
