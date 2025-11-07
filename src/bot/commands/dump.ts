import { Bot } from "grammy/mod.ts"
import { kv } from "../../db/kv.ts"

export function dumpCommand(bot: Bot) {
  bot.command("dump", async ctx => {
    if (!ctx.from) return

    const entries: string[] = []

    for await (const entry of kv.list({ prefix: ["user"] })) {
      entries.push(JSON.stringify(entry, null, 2))
    }

    if (entries.length === 0) {
      await ctx.reply("📭 KV хранилище пусто")
      return
    }

    const message = entries.join("\n\n")

    // Чтобы не превышать лимит Telegram
    await ctx.reply(`📦 Найдено ${entries.length} записей:`)
    await ctx.reply(message.slice(0, 4000)) // первые 4000 символов
  })
}
