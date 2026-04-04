import { describe, expect, it } from 'vitest'

import { loginSchema } from '../model/login-schema'

describe('loginSchema', () => {
    it('should fail when email is invalid', () => {
        const result = loginSchema.safeParse({
            email: 'email-invalido',
            password: '123456',
        })

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0]?.message).toBe('E-mail inválido')
        }
    })

    it('should fail when password has less than 6 chars', () => {
        const result = loginSchema.safeParse({
            email: 'lucca@exemplo.com',
            password: '12345',
        })

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0]?.message).toBe(
                'A senha deve ter pelo menos 6 caracteres',
            )
        }
    })

    it('should pass with valid email and password', () => {
        const result = loginSchema.safeParse({
            email: 'lucca@exemplo.com',
            password: '123456',
        })

        expect(result.success).toBe(true)
    })
})
