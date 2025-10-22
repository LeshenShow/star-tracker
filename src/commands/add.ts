import { Context } from "telegraf"
import prisma from "../db/client"

export const addCommand = async (ctx: Context) => {
  if (!ctx.message || !("text" in ctx.message)) {
    return ctx.reply("❌ Что-то пошло не так, это не текстовое сообщение")
  }
  const text = ctx.message?.text?.replace("/add", "").trim()
  if (!text) return ctx.reply("❌ Пожалуйста, укажите текст после /add")

  const entry = await prisma.entry.create({ data: { text } })
  ctx.reply(`✅ Запись добавлена! ID: ${entry.id}`)
}
