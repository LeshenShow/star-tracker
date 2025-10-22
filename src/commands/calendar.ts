// src/commands/calendar.ts
import { Telegraf, Context } from "telegraf"
import { Calendar } from "telegram-inline-calendar"
import prisma from "../db/client"

export const setupCalendar = (bot: Telegraf<Context>) => {
  const calendar = new Calendar(bot, {
    date_format: "DD-MM-YYYY",
    language: "ru",
    bot_api: "telegraf",
  })

  // Команда для показа календаря
  bot.command("calendar", ctx => {
    calendar.startNavCalendar(ctx)
  })

  // Обработка кликов по кнопкам календаря
  bot.on("callback_query", async ctx => {
    const chatId = ctx.callbackQuery.message?.chat.id
    if (!chatId) return

    if (ctx.callbackQuery.message?.message_id === calendar.chats.get(chatId)) {
      const selectedDate = calendar.clickButtonCalendar(ctx)
      if (selectedDate !== -1) {
        // Сохраняем выбранную дату в базу
        await prisma.entry.create({
          data: { text: `Запись на ${selectedDate}` },
        })

        await ctx.reply(`✅ Запись создана на ${selectedDate}`)
      }
    }
  })
}
