const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  // // Create a user
  // const user = await prisma.user.create({
  //   data: {
  //     email: "demo@example.com",
  //     password: "hashedpassword123", // ⚠️ Replace with bcrypt in real app
  //     name: "Demo User",
  //   },
  // });

  // // Accounts
  // const checking = await prisma.account.create({
  //   data: {
  //     userId: user.id,
  //     name: "Checking Account",
  //     type: "CHECKING",
  //     balance: 2500,
  //   },
  // });

  // const savings = await prisma.account.create({
  //   data: {
  //     userId: user.id,
  //     name: "Savings Account",
  //     type: "SAVINGS",
  //     balance: 7500,
  //   },
  // });

  // // Categories
  // const food = await prisma.category.create({
  //   data: { userId: user.id, name: "Food & Dining", color: "#FF6347" },
  // });
  // const utilities = await prisma.category.create({
  //   data: { userId: user.id, name: "Utilities", color: "#1E90FF" },
  // });
  // const incomeCat = await prisma.category.create({
  //   data: { userId: user.id, name: "Salary", color: "#32CD32" },
  // });

  // // Transactions
  // await prisma.transaction.createMany({
  //   data: [
  //     {
  //       userId: user.id,
  //       accountId: checking.id,
  //       categoryId: food.id,
  //       amount: -45.5,
  //       date: new Date("2025-09-20"),
  //       description: "Dinner at restaurant",
  //       type: "EXPENSE",
  //     },
  //     {
  //       userId: user.id,
  //       accountId: checking.id,
  //       categoryId: utilities.id,
  //       amount: -120,
  //       date: new Date("2025-09-18"),
  //       description: "Electric Bill",
  //       type: "EXPENSE",
  //     },
  //     {
  //       userId: user.id,
  //       accountId: checking.id,
  //       categoryId: incomeCat.id,
  //       amount: 3000,
  //       date: new Date("2025-09-15"),
  //       description: "Monthly Salary",
  //       type: "INCOME",
  //     },
  //   ],
  // });

  // // Budget
  // await prisma.budget.create({
  //   data: {
  //     userId: user.id,
  //     categoryId: food.id,
  //     period: "MONTHLY",
  //     amount: 500,
  //     spent: 120,
  //     startDate: new Date("2025-09-01"),
  //   },
  // });

  // // Goal
  // await prisma.goal.create({
  //   data: {
  //     userId: user.id,
  //     title: "Vacation Fund",
  //     targetAmount: 2000,
  //     savedAmount: 900,
  //     monthlyContribution: 200,
  //     dueDate: new Date("2026-06-01"),
  //   },
  // });

  // === User 1 ===
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      password: "hashedpassword1",
      name: "Alice Johnson",
      accounts: {
        create: [
          { name: "Checking Account", type: "checking", balance: 3200.5 },
          { name: "Savings Account", type: "savings", balance: 15000 },
          { name: "Credit Card", type: "credit", balance: -500.75 },
        ],
      },
      categories: {
        create: [
          { name: "Groceries", color: "#FF5733" },
          { name: "Rent", color: "#33C1FF" },
          { name: "Salary", color: "#28A745" },
        ],
      },
    },
  });

  // Create 10+ Transactions for Alice
  const account1 = await prisma.account.findFirst({
    where: { userId: user1.id, type: "checking" },
  });
  const groceries = await prisma.category.findFirst({
    where: { userId: user1.id, name: "Groceries" },
  });
  const salary = await prisma.category.findFirst({
    where: { userId: user1.id, name: "Salary" },
  });

  if (account1 && groceries && salary) {
    await prisma.transaction.createMany({
      data: [
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: salary.id,
          amount: 5000,
          type: "income",
          date: new Date("2025-09-01"),
          description: "Monthly Salary",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -120.5,
          type: "expense",
          date: new Date("2025-09-02"),
          description: "Whole Foods",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -85.2,
          type: "expense",
          date: new Date("2025-09-10"),
          description: "Trader Joe’s",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -200.75,
          type: "expense",
          date: new Date("2025-09-15"),
          description: "Costco",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -50.1,
          type: "expense",
          date: new Date("2025-09-18"),
          description: "Walmart",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -35.4,
          type: "expense",
          date: new Date("2025-09-19"),
          description: "Aldi",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -99.99,
          type: "expense",
          date: new Date("2025-09-20"),
          description: "Target",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: salary.id,
          amount: 250,
          type: "income",
          date: new Date("2025-09-22"),
          description: "Freelance",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -65.25,
          type: "expense",
          date: new Date("2025-09-23"),
          description: "Publix",
        },
        {
          userId: user1.id,
          accountId: account1.id,
          categoryId: groceries.id,
          amount: -47.6,
          type: "expense",
          date: new Date("2025-09-24"),
          description: "Harris Teeter",
        },
      ],
    });
  }

  // Budgets for Alice
  await prisma.budget.createMany({
    data: [
      {
        userId: user1.id,
        categoryId: groceries?.id,
        period: "monthly",
        amount: 600,
        spent: 500,
        startDate: new Date("2025-09-01"),
      },
      {
        userId: user1.id,
        categoryId: salary?.id,
        period: "monthly",
        amount: 0,
        spent: 0,
        startDate: new Date("2025-09-01"),
      },
    ],
  });

  // Goals for Alice
  await prisma.goal.createMany({
    data: [
      {
        userId: user1.id,
        title: "Emergency Fund",
        targetAmount: 10000,
        savedAmount: 4000,
        monthlyContribution: 500,
        dueDate: new Date("2026-12-31"),
      },
      {
        userId: user1.id,
        title: "Vacation",
        targetAmount: 5000,
        savedAmount: 1200,
        monthlyContribution: 200,
        dueDate: new Date("2026-06-30"),
      },
    ],
  });

  // === User 2 ===
  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      password: "hashedpassword2",
      name: "Bob Smith",
      accounts: {
        create: [
          { name: "Main Checking", type: "checking", balance: 2100.75 },
          { name: "Brokerage", type: "brokerage", balance: 32000 },
          { name: "Savings", type: "savings", balance: 8500 },
        ],
      },
      categories: {
        create: [
          { name: "Dining", color: "#FFC300" },
          { name: "Utilities", color: "#DAF7A6" },
          { name: "Investments", color: "#C70039" },
        ],
      },
    },
  });

  const account2 = await prisma.account.findFirst({
    where: { userId: user2.id, type: "checking" },
  });
  const dining = await prisma.category.findFirst({
    where: { userId: user2.id, name: "Dining" },
  });
  const invest = await prisma.category.findFirst({
    where: { userId: user2.id, name: "Investments" },
  });

  if (account2 && dining && invest) {
    await prisma.transaction.createMany({
      data: [
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: invest.id,
          amount: 4000,
          type: "income",
          date: new Date("2025-09-01"),
          description: "Stock Sale",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -60.75,
          type: "expense",
          date: new Date("2025-09-02"),
          description: "Pizza Hut",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -45.5,
          type: "expense",
          date: new Date("2025-09-03"),
          description: "McDonald's",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -120.9,
          type: "expense",
          date: new Date("2025-09-04"),
          description: "Olive Garden",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -35.0,
          type: "expense",
          date: new Date("2025-09-05"),
          description: "Starbucks",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: invest.id,
          amount: 300,
          type: "income",
          date: new Date("2025-09-07"),
          description: "Dividends",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -55.25,
          type: "expense",
          date: new Date("2025-09-08"),
          description: "Chipotle",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -75.3,
          type: "expense",
          date: new Date("2025-09-10"),
          description: "Buffalo Wild Wings",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -40.5,
          type: "expense",
          date: new Date("2025-09-11"),
          description: "Taco Bell",
        },
        {
          userId: user2.id,
          accountId: account2.id,
          categoryId: dining.id,
          amount: -99.99,
          type: "expense",
          date: new Date("2025-09-12"),
          description: "Applebee’s",
        },
      ],
    });
  }

  await prisma.budget.createMany({
    data: [
      {
        userId: user2.id,
        categoryId: dining?.id,
        period: "monthly",
        amount: 800,
        spent: 650,
        startDate: new Date("2025-09-01"),
      },
      {
        userId: user2.id,
        categoryId: invest?.id,
        period: "monthly",
        amount: 1000,
        spent: 700,
        startDate: new Date("2025-09-01"),
      },
    ],
  });

  await prisma.goal.createMany({
    data: [
      {
        userId: user2.id,
        title: "New Car",
        targetAmount: 20000,
        savedAmount: 5000,
        monthlyContribution: 800,
        dueDate: new Date("2027-01-01"),
      },
      {
        userId: user2.id,
        title: "Retirement Fund",
        targetAmount: 100000,
        savedAmount: 25000,
        monthlyContribution: 1000,
        dueDate: new Date("2040-01-01"),
      },
    ],
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
