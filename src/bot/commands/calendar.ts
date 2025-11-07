import { Bot } from "grammy/mod.ts"
import { buildMonthKeyboard } from "../utils/index.ts"

export function calendarCommand(bot: Bot) {
  bot.command("calendar", async ctx => {
    const now = new Date()
    const keyboard = buildMonthKeyboard(now.getFullYear(), now.getMonth())
    await ctx.reply("Выберите дату:", { reply_markup: keyboard })
  })
}
