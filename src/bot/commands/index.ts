import { Bot } from "grammy/mod.ts"
import { startCommand } from "./start.ts"
import { statsCommand } from "./stats.ts"
import { clearCommand } from "./clear.ts"
import { dumpCommand } from "./dump.ts"
import { calendarCommand } from "./calendar.ts"
import { menuCommand } from "./menu.ts"

export function setupCommands(bot: Bot) {
  startCommand(bot)
  statsCommand(bot)
  clearCommand(bot)
  dumpCommand(bot)
  calendarCommand(bot)
  menuCommand(bot)
}
