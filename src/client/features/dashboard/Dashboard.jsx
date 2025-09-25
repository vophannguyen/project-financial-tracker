export default function Dashboard() {
  return (
    <main className="container">
      {/* <!-- Top summary row --> */}
      <section className="grid grid--3">
        <div className="card balance-card">
          <h3 className="card__title">Total Balance</h3>
          <div className="balance-card__amount">$42,350</div>
          <ul className="balance-breakdown">
            <li>
              <span className="dot dot--blue"></span> Cash Accounts
              <span className="muted">$15,320</span>
            </li>
            <li>
              <span className="dot dot--green"></span> Investments
              <span className="muted">$18,500</span>
            </li>
            <li>
              <span className="dot dot--red"></span> Credit / Debt
              <span className="muted">-$5,470</span>
            </li>
          </ul>
        </div>

        <div className="card chart-card" id="incomeExpensesCard">
          <h3 className="card__title">Income &amp; Expenses (last 8 months)</h3>
          <div id="incomeExpensesChart" className="chart"></div>
          <div className="net-cashflow">
            Net Cash Flow <strong className="positive">+$2,600</strong>
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
              <tr>
                <td>Oct 12</td>
                <td>Grocery</td>
                <td>
                  <span className="badge badge--green">Groceries</span>
                </td>
                <td>Cash</td>
                <td className="align-right negative">-$195.50</td>
              </tr>
              <tr>
                <td>Oct 11</td>
                <td>Salary</td>
                <td>
                  <span className="badge badge--blue">Income</span>
                </td>
                <td>Checking</td>
                <td className="align-right positive">+$3,500.00</td>
              </tr>
              <tr>
                <td>Oct 10</td>
                <td>Electricity Bill</td>
                <td>
                  <span className="badge badge--orange">Utilities</span>
                </td>
                <td>Credit Card</td>
                <td className="align-right negative">-$75.00</td>
              </tr>
              <tr>
                <td>Oct 9</td>
                <td>Restaurant</td>
                <td>
                  <span className="badge badge--red">Restaurants</span>
                </td>
                <td>Cash</td>
                <td className="align-right negative">-$45.00</td>
              </tr>
              <tr>
                <td>Oct 9</td>
                <td>Gas</td>
                <td>
                  <span className="badge badge--green">Transport</span>
                </td>
                <td>Credit</td>
                <td className="align-right negative">-$20.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card budgets-card">
          <h3 className="card__title">Budgets at a Glance</h3>
          <ul className="budget-list">
            <li>
              <div className="budget-left">
                <span className="label">Groceries</span>
                <div className="muted small">$1,400 of $2,000</div>
              </div>
              <div className="budget-right">
                <div className="progress">
                  <div className="progress__bar" style={{ width: "70%" }}></div>
                </div>
                <div className="percent">70%</div>
              </div>
            </li>
            <li>
              <div className="budget-left">
                <span className="label">Rent</span>
                <div className="muted small">$1,200 of $1,200</div>
              </div>
              <div className="budget-right">
                <div className="progress">
                  <div
                    className="progress__bar progress__bar--danger"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="percent">100%</div>
              </div>
            </li>
            <li>
              <div className="budget-left">
                <span className="label">Utilities</span>
                <div className="muted small">$400 of $800</div>
              </div>
              <div className="budget-right">
                <div className="progress">
                  <div className="progress__bar" style={{ width: "50%" }}></div>
                </div>
                <div className="percent">50%</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="card goals-card">
          <h3 className="card__title">Goals &amp; Savings</h3>
          <div className="goals-grid">
            <div className="goal">
              <div className="goal__title">Vacation</div>
              <div className="progress small">
                <div className="progress__bar" style={{ width: "70%" }}></div>
              </div>
              <div className="muted small">$3,000 / $4,000</div>
            </div>
            <div className="goal">
              <div className="goal__title">Emergency Fund</div>
              <div className="progress small">
                <div className="progress__bar" style={{ width: "70%" }}></div>
              </div>
              <div className="muted small">$1,800 / $4,000</div>
            </div>
            <div className="goal">
              <div className="goal__title">House Down</div>
              <div className="progress small">
                <div className="progress__bar" style={{ width: "70%" }}></div>
              </div>
              <div className="muted small">$12,000 / $20,000</div>
            </div>
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
