import { Context } from "telegraf"
import prisma from "../db/client"

export const deleteCommand = async (ctx: Context) => {
  if (!ctx.message || !("text" in ctx.message)) {
    return ctx.reply("❌ Что-то пошло не так, это не текстовое сообщение")
  }
  const id = Number(ctx.message?.text?.replace("/delete", "").trim())
  if (!id) return ctx.reply("❌ Укажите корректный ID после /delete")

  try {
    await prisma.entry.delete({ where: { id } })
    ctx.reply(`✅ Запись с ID ${id} удалена`)
  } catch {
    ctx.reply(`❌ Запись с ID ${id} не найдена`)
  }
}
