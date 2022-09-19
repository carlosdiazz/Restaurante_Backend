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
const role = z.array(z.string())
const id= z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);

export const createUserSchema = z.object({
    body: z.object({
        first_name: first_name,
        last_name: last_name,
        nickname: nickname,
        email: email,
        password: password,
        birth_date: birth_date,
        phone: phone,
        is_active: is_active,
        is_staff: is_staff,
        role: role.optional()
    })
})

export const updateUserSchema = z.object({
    body: z.object({
        first_name: first_name.optional(),
        last_name: last_name.optional(),
        nickname: nickname.optional(),
        email: email.optional(),
        birth_date: birth_date.optional(),
        phone: phone.optional(),
        is_active: is_active.optional(),
        is_staff: is_staff.optional()
    }),
    params: z.object({
        id: id
    })
})

export const deleteUserSchema = z.object({
    params: z.object({
        id: id
    })
})

export const getUserSchema = z.object({
    params: z.object({
        id: id
    })
})

// aqui hago un type para que me deje usar el metodo .map() de zod
export type createUserType = z.infer<typeof createUserSchema>['body']