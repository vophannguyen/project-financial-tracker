import AddBudget from "./AddBudget";
import "./Budget.less";
import { useGetBudgetsQuery } from "./budgetSlice";
export default function Budgets() {
  const { data: budget, isLoading } = useGetBudgetsQuery();
  if (isLoading) {
    return <div>Loading.........</div>;
  }
  console.log(budget);
  return (
    <div className="container-bud">
      <section className="page-head">
        <div>
          <h1>Budgets</h1>
          <p className="muted">
            Plan monthly spending and keep track of limits
          </p>
        </div>

        <div className="controls">
          <select id="monthSelect" className="select">
            <option>September 2025</option>
            <option>August 2025</option>
            <option>July 2025</option>
          </select>
          <AddBudget />
          <button className="btn btn--ghost" id="addCategoryBtn">
            + Category
          </button>
        </div>
      </section>

      <section className="grid grid--2">
        <div className="card budgets-card">
          <h3 className="card__title">Monthly Budgets</h3>

          <div className="budget-headers">
            <div className="col col--cat">Category</div>
            <div className="col col--amount">Limit</div>
            <div className="col col--spent">Spent</div>
            <div className="col col--progress">Progress</div>
            <div className="col col--actions"></div>
          </div>

          <ul className="budget-list-bd">
            {budget.map((bud) => {
              return (
                <li className="budget-row-bd" key={bud.id}>
                  <div className="col col--cat">
                    <div className="cat-meta">
                      <span
                        className="dot"
                        style={{ background: `${bud.color}` }}
                      ></span>
                      <strong>{bud.name}</strong>
                    </div>
                  </div>
                  <div className="col col--amount">${bud.amount}</div>
                  <div className="col col--spent">${bud.spent}</div>
                  <div className="col col--progress">
                    <div className="progress">
                      <div
                        className="progress__bar"
                        style={{
                          width: `${
                            bud.amount > 0
                              ? Math.ceil(bud.spent / bud.amount) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="percent">
                      {Number(bud.amount) > 0
                        ? Math.ceil((bud.spent / bud.amount) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                  <div className="col col--actions">
                    <button className="icon-btn" title="Edit">
                      ✎
                    </button>
                    <button className="icon-btn" title="Delete">
                      🗑
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="muted small">
            Tip: Click a category to edit or drag to reorder (future
            enhancement)
          </div>
        </div>

        <aside className="card side-card">
          <h3 className="card__title">Budget Overview</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <div className="muted small">Total Limit</div>
              <div className="value">$4,300</div>
            </div>
            <div className="overview-item">
              <div className="muted small">Total Spent</div>
              <div className="value negative">$3,190</div>
            </div>
            <div className="overview-item">
              <div className="muted small">Remaining</div>
              <div className="value">$1,110</div>
            </div>
          </div>

          <div className="chart-placeholder">
            {/* <!-- Placeholder for pie chart --> */}
            <svg width="180" height="180" viewBox="0 0 100 100" className="pie">
              <circle cx="50" cy="50" r="30" fill="#f3f7fb" />
              <path
                d="M50 20 A30 30 0 0 1 80 50 L50 50 Z"
                fill="#1967d2"
              ></path>
              <path
                d="M80 50 A30 30 0 0 1 60 80 L50 50 Z"
                fill="#10b981"
              ></path>
              <path
                d="M60 80 A30 30 0 0 1 40 60 L50 50 Z"
                fill="#f59e0b"
              ></path>
            </svg>
            <div className="muted small">Category distribution</div>
          </div>

          <div>
            <AddBudget />
            <button className="btn btn--ghost" id="exportBudgets">
              Export CSV
            </button>
          </div>
        </aside>
      </section>

      <footer className="footer muted">
        © <span id="year"></span> Finance Tracker — Budgets
      </footer>
    </div>
  );
}
