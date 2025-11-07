import { Bot } from "grammy/mod.ts"
import { getUser } from "../../db/kv.ts"

export function statsCommand(bot: Bot) {
  bot.command("stats", async ctx => {
    if (!ctx.from) {
      await ctx.reply("Не могу определить пользователя 😕")
      return
    }
    const userId = ctx.from.id
    const user = await getUser(userId)

    if (!user) {
      await ctx.reply("Я пока ничего про тебя не знаю 😅")
      return
    }

    const info = [
      `👤 Имя: ${ctx.from.first_name}`,
      ctx.from.username ? `🔗 Username: @${ctx.from.username}` : null,
      `💬 Последнее сообщение: ${user.lastMessage || "неизвестно"}`,
    ]
      .filter(Boolean)
      .join("\n")

    await ctx.reply(info)
  })
}
