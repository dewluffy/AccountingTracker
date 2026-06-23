import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

const main = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@test.com",
    },
    update: {},
    create: {
      email: "admin@test.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "System",
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Admin user seeded successfully:", admin.email);
};

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });