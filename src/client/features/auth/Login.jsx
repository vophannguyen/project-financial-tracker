import { useState } from "react";
import "./login.less";
import { useLoginMutation } from "./authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  async function handleLogin(e) {
    e.preventDefault();
    const credentials = { email, password };
    console.log(credentials);
    try {
      const res = await login(credentials);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="login">
      <div className="frame-login">
        <aside className="panel-login">
          <h1>Finance Tracker</h1>
          <p>
            Welcome back — manage your cash, budgets, and goals in one place.
          </p>
          <div className="feature-list">
            <div className="feature">
              <span className="dot primary"></span>
              <div>
                <strong>Dashboard</strong>
                <div className="small">At-a-glance finances</div>
              </div>
            </div>
            <div className="feature">
              <span className="dot accent"></span>
              <div>
                <strong>Budgets</strong>
                <div className="small">Track spending</div>
              </div>
            </div>
            <div className="feature">
              <span className="dot warn"></span>
              <div>
                <strong>Goals</strong>
                <div className="small">Save milestones</div>
              </div>
            </div>
          </div>
        </aside>

        <section className="card">
          <div className="brand">
            <div className="logo">FT</div>
            <div>
              <h2>Sign in to your account</h2>
              <p>Enter your credentials to continue</p>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="row">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <a className="link" href="#">
                Forgot?
              </a>
            </div>

            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
            <div className="or">or continue with</div>
            <div className="socials">
              <button type="button" className="social">
                Google
              </button>
              <button type="button" className="social">
                GitHub
              </button>
            </div>
            <div className="small">
              Don't have an account?{" "}
              <a className="link" href="#">
                Create account
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
