const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      password: "hashedpassword123", // ⚠️ Replace with bcrypt in real app
      name: "Demo User",
    },
  });

  // Accounts
  const checking = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Checking Account",
      type: "CHECKING",
      balance: 2500,
    },
  });

  const savings = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Savings Account",
      type: "SAVINGS",
      balance: 7500,
    },
  });

  // Categories
  const food = await prisma.category.create({
    data: { userId: user.id, name: "Food & Dining", color: "#FF6347" },
  });
  const utilities = await prisma.category.create({
    data: { userId: user.id, name: "Utilities", color: "#1E90FF" },
  });
  const incomeCat = await prisma.category.create({
    data: { userId: user.id, name: "Salary", color: "#32CD32" },
  });

  // Transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        accountId: checking.id,
        categoryId: food.id,
        amount: -45.5,
        date: new Date("2025-09-20"),
        description: "Dinner at restaurant",
        type: "EXPENSE",
      },
      {
        userId: user.id,
        accountId: checking.id,
        categoryId: utilities.id,
        amount: -120,
        date: new Date("2025-09-18"),
        description: "Electric Bill",
        type: "EXPENSE",
      },
      {
        userId: user.id,
        accountId: checking.id,
        categoryId: incomeCat.id,
        amount: 3000,
        date: new Date("2025-09-15"),
        description: "Monthly Salary",
        type: "INCOME",
      },
    ],
  });

  // Budget
  await prisma.budget.create({
    data: {
      userId: user.id,
      categoryId: food.id,
      period: "MONTHLY",
      amount: 500,
      spent: 120,
      startDate: new Date("2025-09-01"),
    },
  });

  // Goal
  await prisma.goal.create({
    data: {
      userId: user.id,
      title: "Vacation Fund",
      targetAmount: 2000,
      savedAmount: 900,
      monthlyContribution: 200,
      dueDate: new Date("2026-06-01"),
    },
  });

  console.log("✅ Seed data created!");
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
