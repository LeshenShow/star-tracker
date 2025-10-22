import prisma from "./db/client" // TS-обёртка

async function main() {
  await prisma.entry.create({
    // entry точно должно быть определено
    data: { text: "Сегодня было солнце ☀️" },
  })

  const entries = await prisma.entry.findMany()
  console.log(entries)
}

main().finally(() => prisma.$disconnect())
