import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    await dispatch(logout());
    navigate("/");
  }
  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="logo">Finance</div>
        <nav className="nav">
          <a className="nav__link active" href="#">
            Dashboard
          </a>
          <a className="nav__link" href="#">
            Budgets
          </a>
          <a className="nav__link" href="#">
            Goals
          </a>
          <a className="nav__link" href="#">
            Reports
          </a>
          <a className="nav__link" href="#">
            Transactions
          </a>
        </nav>
      </div>
      <div className="topbar__right">
        <button className="btn btn--ghost">Export</button>
        <div className="avatar" title="User profile">
          NV
        </div>
        <button className="btn btn--logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
