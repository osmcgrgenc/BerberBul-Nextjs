import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  role: z.enum(['musteri', 'berber', 'admin'], {
    required_error: 'Lütfen bir rol seçin',
  }),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir'
    ),
  role: z.enum(['musteri', 'berber'], {
    required_error: 'Lütfen bir rol seçin',
  }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema> 