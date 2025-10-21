import { Context } from "telegraf"

export const aboutCommand = (ctx: Context) => {
  ctx.reply(
    `Я простой Telegram бот на TypeScript с Telegraf.\n` +
      `Моя цель — демонстрировать базовую работу с командами и сообщениями.`
  )
}
