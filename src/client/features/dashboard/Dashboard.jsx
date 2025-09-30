import { useGetDashboardQuery } from "./dashboardSlice";

export default function Dashboard() {
  /**
   * check login if not
   */
  const { data: dashboard, isLoading } = useGetDashboardQuery();
  if (isLoading) {
    return <div>Loading..........</div>;
  }
  console.log(dashboard);
  const rencentTransactions = dashboard.recentTransactions;
  const budgets = dashboard.budgets;
  const goals = dashboard.goals;
  console.log(goals);
  return (
    <main className="container">
      {/* <!-- Top summary row --> */}
      <section className="grid grid--3">
        <div className="card balance-card">
          <h3 className="card__title">Total Balance</h3>
          <div className="balance-card__amount">${dashboard.totalBalance}</div>
          <ul className="balance-breakdown">
            <li>
              <span className="dot dot--blue"></span> Cash Accounts
              <span className="muted">${dashboard.cashAccount}</span>
            </li>
            <li>
              <span className="dot dot--green"></span> Investments
              <span className="muted">${dashboard.investment}</span>
            </li>
            <li>
              <span className="dot dot--red"></span> Credit / Debt
              <span className="muted">${dashboard.creditDebt}</span>
            </li>
          </ul>
        </div>

        <div className="card chart-card" id="incomeExpensesCard">
          <h3 className="card__title">Income &amp; Expenses (last 8 months)</h3>
          <div id="incomeExpensesChart" className="chart"></div>
          <div className="net-cashflow">
            Net Cash Flow{" "}
            <strong className="positive">${dashboard.netCashFlow}</strong>
          </div>
        </div>

        <div className="card networth-card">
          <h3 className="card__title">Net Worth Trend</h3>
          <div id="netWorthChart" className="chart chart--line"></div>
          <div className="muted">
            Net Worth <strong>$37,650</strong>
          </div>
        </div>
      </section>

      {/* <!-- Middle row: recent transactions and budgets --> */}
      <section className="grid grid--3">
        <div className="card transactions-card">
          <h3 className="card__title">Recent Transactions</h3>
          <div className="tx-filters">
            <button className="chip active">All</button>
            <button className="chip">Income</button>
            <button className="chip">Expenses</button>
            <button className="chip">Transfers</button>
          </div>

          <table
            className="transactions-table"
            aria-label="Recent transactions"
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Account</th>
                <th className="align-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rencentTransactions.map((tran) => {
                return (
                  <tr key={tran.id}>
                    <td>{new Date(tran.date).toDateString()}</td>
                    <td>{tran.description}</td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: `${tran.color}` }}
                      >
                        {tran.category}
                      </span>
                    </td>
                    <td>{tran.account}</td>
                    <td
                      className={
                        tran.amount > 0
                          ? "align-right positive"
                          : "align-right negative"
                      }
                    >
                      {tran.amount}$
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card budgets-card">
          <h3 className="card__title">Budgets at a Glance</h3>
          <ul className="budget-list">
            {budgets.map((bud) => {
              return (
                <li key={bud.id}>
                  <div className="budget-left">
                    <span className="label">{bud.category}</span>
                    <div className="muted small">
                      ${bud.spent} of ${bud.amount}
                    </div>
                  </div>
                  <div className="budget-right">
                    <div className="progress">
                      <div
                        className="progress__bar"
                        style={{ width: `${(bud.spent / bud.amount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="percent">
                      {(bud.spent / bud.amount) * 100}%
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card goals-card">
          <h3 className="card__title">Goals &amp; Savings</h3>
          <div className="goals-grid">
            {goals.map((goal) => {
              return (
                <div className="goal" key={goal.id}>
                  <div className="goal__title">{goal.title}</div>
                  <div className="progress small">
                    <div
                      className="progress__bar"
                      style={{
                        width: `${
                          (goal.savedAmount / goal.targetAmount) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="muted small">
                    ${goal.savedAmount} / ${goal.targetAmount}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="upcoming-bills">
            <h4 className="muted small">Upcoming Bills</h4>
            <ul>
              <li>
                Credit Card — <strong>$200</strong> — due Oct 18
              </li>
              <li>
                Rent — <strong>$1,200</strong> — due Nov 1
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer muted">
        © <span id="year"></span> Finance Tracker — Mockup for portfolio
      </footer>
    </main>
  );
}
