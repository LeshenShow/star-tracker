import { Bot, Keyboard } from "grammy/mod.ts"
import { buildMonthKeyboard } from "../utils/calendar.ts"

export function menuCommand(bot: Bot) {
  bot.on("message:text", async ctx => {
    if (ctx.message.text === "Календарь") {
      const now = new Date()
      const keyboard = buildMonthKeyboard(now.getFullYear(), now.getMonth())
      await ctx.reply("Выберите дату:", { reply_markup: keyboard })
      return
    }

    const menu = new Keyboard().text("Календарь").resized().oneTime()
    await ctx.reply("Выберите действие:", { reply_markup: menu })
  })
}
