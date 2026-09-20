import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = getPrisma();

  const users = await prisma.orm.public.User.all();

  return Response.json(users);
}

export async function POST() {
  const prisma = getPrisma();

  const user = await prisma.orm.public.User.create({
    email: "test@example.com",
    name: "Test User",
  });

  return Response.json(user);
}