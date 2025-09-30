const { ServerError } = require("../../errors");
const prisma = require("../../prisma");

const router = require("express").Router();
module.exports = router;
/** User must be logged in to access tasks. */
router.use((req, res, next) => {
  if (!res.locals.user) {
    return next(new ServerError(401, "You must be logged in."));
  }
  next();
});
router.get("/", async (req, res, next) => {
  try {
    /**Get all account */
    const account = await prisma.account.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /**Get all transaction */
    const transaction = await prisma.transaction.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /**get all Category */
    const category = await prisma.category.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /**get all Budget */
    const budgets = await prisma.budget.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /**get all goals */
    const goals = await prisma.goal.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /**Sum all Income */
    const sumIncome = transaction.reduce((ar, cur) => {
      if (cur.type === "INCOME") {
        return ar + cur.amount;
      }
      return ar;
    }, 0);
    /**Summ all Expense */
    const sumExpense = transaction.reduce((ar, cur) => {
      if (cur.type === "EXPENSE") {
        return ar + cur.amount;
      }
      return ar;
    }, 0);
    /**total Balance , cash Account , credit/debt, investment */
    const totalBalance = account.reduce((ar, cur) => ar + cur.balance, 0);
    const cashAccount = account.reduce(
      (ar, cur) => (cur.balance > 0 ? ar + cur.balance : ar),
      0
    );
    const creditDebt = account.reduce(
      (ar, cur) => (cur.balance < 0 ? ar + cur.balance : ar),
      0
    );
    const investment = account.reduce(
      (ar, cur) => (cur.type === "brokerage" ? ar + cur.balance : ar),
      0
    );
    /** Net Cash Flow */
    const netCashFlow = sumIncome - sumExpense;
    /**Recent Transactions Date , Description, Category, Acount, Amount */
    const recentTransactions = transaction.slice().map((tran) => {
      tran["category"] = category.find(
        (cat) => cat.id === tran.categoryId
      ).name;
      tran["account"] = account.find((ac) => ac.id === tran.accountId).type;
      tran["color"] = category.find((cat) => cat.id === tran.categoryId).color;

      return tran;
    });
    const newBudgets = budgets.slice();
    newBudgets.map((bud) => {
      bud["category"] = category.find((cat) => cat.id === bud.categoryId).name;
      return bud;
    });
    res.json({
      totalBalance,
      netCashFlow,
      recentTransactions,
      budgets,
      cashAccount,
      creditDebt,
      investment,
      goals,
    });
    console.log(newBudgets, recentTransactions, category);
  } catch (err) {
    next(err);
  }
});
