import { Bot } from "grammy/mod.ts"
import { messageHandler } from "./messageHandler.ts"
import { calendarHandler } from "./calendarHandler.ts"
export function setupHandlers(bot: Bot) {
  messageHandler(bot)
  calendarHandler(bot)
}
