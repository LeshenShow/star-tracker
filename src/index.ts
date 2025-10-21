import { Telegraf, Context } from "telegraf"
import dotenv from "dotenv"
import type { Message } from "telegraf/types"
import { startCommand } from "./commands/start"
import { helpCommand } from "./commands/help"
import { aboutCommand } from "./commands/about"

// Загружаем переменные окружения из .env
dotenv.config()

// Проверяем наличие токена
const BOT_TOKEN = process.env.BOT_TOKEN
if (!BOT_TOKEN) {
  throw new Error("❌ BOT_TOKEN не найден в .env")
}

// Инициализация бота
const bot = new Telegraf(BOT_TOKEN)

// Обработка команд
bot.start((ctx: Context) => startCommand(ctx))
bot.command("help", (ctx: Context) => helpCommand(ctx))
bot.command("about", (ctx: Context) => aboutCommand(ctx))

// Эхо всех текстовых сообщений
bot.on("text", (ctx: Context) => {
  const message = ctx.message as Message.TextMessage
  ctx.reply(`Ты сказал: "${message.text}"`)
})
// Обработка нажатий Inline кнопок
bot.action("HELP", ctx => {
  helpCommand(ctx)
  ctx.answerCbQuery() // закрывает "загрузка" на кнопке
})

bot.action("ABOUT", ctx => {
  aboutCommand(ctx)
  ctx.answerCbQuery()
})
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
