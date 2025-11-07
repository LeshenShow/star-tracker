import type { UserData } from "../types/index.ts"

export const kv = await Deno.openKv("data/kv.sqlite")
console.log("✅ KV запущен")
// Пример вспомогательных функций
export async function saveUser(id: number, data: Record<string, unknown>) {
  await kv.set(["user", id], data)
}

export async function getUser(id: number) {
  const res = await kv.get<UserData>(["user", id])
  return res.value
}
