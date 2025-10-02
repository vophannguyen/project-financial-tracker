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
    /**get all budget */
    const budget = await prisma.budget.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /*** get all category */
    const category = await prisma.category.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    /**add color to budget and res to front */
    const newBudget = budget.slice();
    newBudget.map((bud) => {
      bud["color"] = category.find((ca) => ca.id === bud.categoryId).color;
      bud["name"] = category.find((ca) => ca.id === bud.categoryId).name;
    });
    res.json(newBudget);
    console.Console.log(budget);
  } catch (err) {
    next(err);
  }
});
