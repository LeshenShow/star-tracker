import { InlineKeyboard } from "grammy/mod.ts"
import { MONTHS } from "../../const/index.ts"

export function buildMonthKeyboard(year: number, month: number): InlineKeyboard {
  const keyboard = new InlineKeyboard()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonth = new Date(year, month - 1, 1)
  const nextMonth = new Date(year, month + 1, 1)
  let monthText = `${MONTHS[month]} ${year}`
  if (monthText.length < 30) {
    const padding = 30 - monthText.length
    const leftPad = Math.floor(padding / 2)
    const rightPad = padding - leftPad
    monthText = "_".repeat(leftPad) + monthText + "_".repeat(rightPad)
  }
  keyboard.text("◀️", `month:${prevMonth.getFullYear()}-${prevMonth.getMonth()}`)
  keyboard.text(monthText, "ignore")
  keyboard.text("▶️", `month:${nextMonth.getFullYear()}-${nextMonth.getMonth()}`)
  keyboard.row() // новая строка

  // Генерация кнопок дней
  let row: { text: string; callback_data: string }[] = []
  for (let day = 1; day <= daysInMonth; day++) {
    row.push({ text: day.toString(), callback_data: `calendar:${year}-${month + 1}-${day}` })

    if (day % 7 === 0 || day === daysInMonth) {
      keyboard.row(...row)
      row = []
    }
  }

  return keyboard
}
