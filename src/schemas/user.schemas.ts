import {z} from 'zod'

const first_name = z.string({required_error: "Es obligatorio"}).min(1).max(50)
const last_name = z.string().min(1).max(50)
const nickname = z.string().min(5).max(50)
const email = z.string().email()
const password = z.string().min(8).max(50)
const birth_date = z.string()
const phone = z.string().max(10).default('')
const is_active = z.boolean().default(true)
const is_staff = z.boolean().default(false)

export const createUserSchema = z.object({
    first_name: first_name,
    last_name: last_name,
    nickname: nickname,
    email: email,
    password: password,
    birth_date: birth_date,
    phone: phone,
    is_active: is_active,
    is_staff: is_staff
})

