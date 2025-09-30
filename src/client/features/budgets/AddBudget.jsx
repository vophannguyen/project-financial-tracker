import { useState } from "react";
import "./Budget.less";
export default function AddBudget() {
  const [display, setDisplay] = useState("false");
  function handleClick() {
    setDisplay(() => !display);
  }
  //   console.log(display);
  return (
    <>
      <button className="btn btn--primary" onClick={handleClick}>
        AddBudget
      </button>
      {!display && (
        <div className="modal">
          <div className="modal__card">
            <h3>Add Budget</h3>
            <form>
              <label>Category</label>
              <select className="select">
                <option>Groceries</option>
                <option>Rent</option>
                <option>Utilities</option>
                <option>Dining Out</option>
              </select>

              <label>Monthly Limit</label>
              <input
                className="input"
                type="number"
                placeholder="Amount in USD"
              />

              <div className="container-btn">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={handleClick}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
