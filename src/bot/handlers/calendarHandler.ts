import { Bot } from "grammy/mod.ts"
import { kv } from "../../db/kv.ts"
import { buildMonthKeyboard } from "../utils/index.ts"

export function calendarHandler(bot: Bot) {
  bot.callbackQuery(/^calendar:/, async ctx => {
    const data = ctx.callbackQuery.data
    const date = data.split(":")[1]

    if (ctx.from) {
      await kv.set(["user", ctx.from.id, "selectedDate"], date)
    }

    await ctx.answerCallbackQuery(`Вы выбрали: ${date}`)
    await ctx.editMessageText(`📅 Выбрана дата: ${date}`)
  })

  // 2️⃣ Навигация по месяцам
  bot.callbackQuery(/^month:/, async ctx => {
    const [yearStr, monthStr] = ctx.callbackQuery.data.split(":")[1].split("-")
    const year = parseInt(yearStr)
    const month = parseInt(monthStr)

    const keyboard = buildMonthKeyboard(year, month)
    await ctx.editMessageReplyMarkup({ reply_markup: keyboard })
  })
}
