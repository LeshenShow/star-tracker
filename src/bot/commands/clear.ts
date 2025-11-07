import { Bot } from "grammy/mod.ts"
import { kv } from "../../db/kv.ts"

export function clearCommand(bot: Bot) {
  bot.command("clear", async ctx => {
    if (!ctx.from) return

    let count = 0

    for await (const entry of kv.list({ prefix: ["user"] })) {
      await kv.delete(entry.key)
      count++
    }

    if (count === 0) {
      await ctx.reply("📭 В KV нет данных для удаления.")
    } else {
      await ctx.reply(`🧹 Удалено ${count} записей из KV.`)
    }
  })
}
