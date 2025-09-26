import { PrismaClient, Prisma } from "../src/shared/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Dima",
    lastName: "Frolov",
    email: "dmitriyworksspace013@gmail.com",
    password: "123456",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
