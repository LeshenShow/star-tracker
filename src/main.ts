import "std/dotenv/load.ts"
import { TOKEN } from "./const/index.ts"
import { createBot } from "./bot/bot.ts"

if (!TOKEN) throw new Error("No token")
const bot = createBot(TOKEN)
bot.start()
console.log("✅ Бот запущен...")
