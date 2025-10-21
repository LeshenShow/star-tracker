import { Context, Markup } from "telegraf"
export const startCommand = (ctx: Context) => {
  const user = ctx.from?.first_name || "друг"
  // ctx.reply(`Привет, ${user}! 👋\nЯ TypeScript Telegram бот. Напиши /help, чтобы узнать мои команды.`)
  ctx.reply(
    `Привет, ${user}! 👋\nВыберите действие:`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Помощь ❓", "HELP")],
      [Markup.button.callback("О боте ℹ️", "ABOUT")],
    ])
  )
}
