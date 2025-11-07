import { Bot } from "grammy/mod.ts"
import { saveUser } from "../../db/kv.ts"

export function messageHandler(bot: Bot) {
  bot.on("message:text", async ctx => {
    if (!ctx.from) return
    const userId = ctx.from.id
    const text = ctx.message.text

    // Сохраняем последнюю активность пользователя
    await saveUser(userId, { lastMessage: text, username: ctx.from.username, updatedAt: new Date().toISOString() })

    await ctx.reply(`Ты написал: ${text}`)
  })
}
