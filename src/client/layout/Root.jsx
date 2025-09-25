import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import "./Root.less";
import Header from "./Header";

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
