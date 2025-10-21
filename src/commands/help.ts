import { Context } from "telegraf"

export const helpCommand = (ctx: Context) => {
  ctx.reply(
    `Вот команды, которые я понимаю:\n` + `/start - приветствие\n` + `/help - помощь\n` + `/about - информация о боте`
  )
}
