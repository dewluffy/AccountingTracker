import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
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

  console.log("✅ Admin seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });