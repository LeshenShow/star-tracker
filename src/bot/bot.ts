import { Bot } from "grammy/mod.ts"
import { setupCommands } from "./commands/index.ts"
import { setupHandlers } from "./handlers/index.ts"

// deno task start
export function createBot(token: string) {
  const bot = new Bot(token)
  setupCommands(bot)
  setupHandlers(bot)

  return bot
}
