import { Context } from "telegraf"
import prisma from "../db/client"

export const listCommand = async (ctx: Context) => {
  const entries = await prisma.entry.findMany({ orderBy: { createdAt: "desc" } })
  if (!entries.length) return ctx.reply("📭 Нет записей")

  const message = entries.map((e: { id: number; text: string }) => `ID:${e.id} - ${e.text}`).join("\n")
  ctx.reply(message)
}
