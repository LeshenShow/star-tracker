// src/commands/calendar.ts
import { Telegraf, Context } from "telegraf"
import { Calendar } from "telegram-inline-calendar"
import prisma from "../db/client"
// interface DraftState {
//   selectedDate?: string
// }
const draftState = new Map<number, {selectedDate?:string}>()
const NO_DATE_SELECTED = -1

export const setupCalendar = (bot: Telegraf<Context>) => {
  const calendar = new Calendar(bot, {
    date_format: "DD-MM-YYYY",
    language: "ru",
    bot_api: "telegraf",
  })

  bot.command("calendar", ctx => calendar.startNavCalendar(ctx))

  // Обработка кликов по кнопкам календаря
  bot.on("callback_query", async ctx => {
    const message = ctx.callbackQuery.message
    // const chatId = ctx.callbackQuery.message?.chat.id
    if (!message) return

    const isEqualId = message.message_id === calendar.chats.get(message.chat.id)
    if (!isEqualId) return

    const selectedDate = calendar.clickButtonCalendar(ctx)
    if (selectedDate === NO_DATE_SELECTED) return

  draftState.set(message.chat.id,  {selectedDate} )
  await ctx.reply(`Введите заметку`)
  })

    // {

    //   if (selectedDate !== NO_DATE_SELECTED) {
    //     await prisma.entry.create({
    //       data: { text: `Запись на ${selectedDate}` },
    //     })
    //     await ctx.reply(`✅ Запись создана на ${selectedDate}`)
    //   }
    // }

}



 bot.on("text", async (ctx) => {
    const chatId = ctx.chat?.id;
    if (!chatId) return;

    const state = userStates.get(chatId);
    if (!state?.selectedDate) return; // если дата не выбрана, ничего не делаем

    const text = ctx.message.text;

    await prisma.entry.create({
      data: {
        text,
        createdAt: new Date(state.selectedDate),
      },
    });

    await ctx.reply(`✅ Запись сохранена на ${state.selectedDate}:\n${text}`);
    userStates.delete(chatId);
  });
}
