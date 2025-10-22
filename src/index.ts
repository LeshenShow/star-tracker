import { Telegraf, Context } from "telegraf"
import dotenv from "dotenv"
import type { Message } from "telegraf/types"
import { startCommand } from "./commands/start"
import { addCommand } from "./commands/add"
import { deleteCommand } from "./commands/delete"
import { listCommand } from "./commands/list"
import { setupCalendar } from "./commands/calendar"

dotenv.config()
const BOT_TOKEN = process.env.BOT_TOKEN
if (!BOT_TOKEN) {
  throw new Error("❌ BOT_TOKEN не найден в .env")
}
const bot = new Telegraf(BOT_TOKEN)
setupCalendar(bot)
// Обработка команд
bot.start((ctx: Context) => startCommand(ctx))

bot.command("add", (ctx: Context) => addCommand(ctx))
bot.command("list", (ctx: Context) => listCommand(ctx))
bot.command("delete", (ctx: Context) => deleteCommand(ctx))

// Эхо всех текстовых сообщений
bot.on("text", (ctx: Context) => {
  const message = ctx.message as Message.TextMessage
  console.log(JSON.stringify(message, null, 2))
  ctx.reply(`Ты сказал: "${message.text}"`)
})
// // Обработка нажатий Inline кнопок
// bot.action("HELP", ctx => {
//   helpCommand(ctx)
//   ctx.answerCbQuery() // закрывает "загрузка" на кнопке
// })

// Обработка ошибок (чтобы бот не падал)
bot.catch((err, ctx) => {
  console.error(`Ошибка в обновлении ${ctx.updateType}:`, err)
})

// Запускаем бота (long polling)
bot.launch()

console.log("🤖 Бот запущен и слушает сообщения...")

// Останавливаем бота корректно при завершении процесса
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
