import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { PrismaClient } = require("../generated/prisma/index.js")
const prisma = new PrismaClient()
export default prisma
