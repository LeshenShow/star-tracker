import { Bot } from "grammy/mod.ts"

export function startCommand(bot: Bot) {
  bot.command("start", ctx => {
    ctx.reply("Привет! Я бот на Deno 🦕")
  })
}
