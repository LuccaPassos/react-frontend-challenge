import { describe, expect, it } from 'vitest'

import { login } from '../api/login'

describe('login', () => {
    it('should authenticate with valid credentials', async () => {
        await expect(login('lucca.covre@exemplo.com', '123456')).resolves.toEqual({
            name: 'Lucca Covre',
            email: 'lucca.covre@exemplo.com',
        })
    })

    it('should normalize email before validating credentials', async () => {
        await expect(
            login('  LUCCA.COVRE@EXEMPLO.COM  ', '123456'),
        ).resolves.toEqual({
            name: 'Lucca Covre',
            email: 'lucca.covre@exemplo.com',
        })
    })

    it('should reject invalid credentials', async () => {
        await expect(login('wrong@exemplo.com', '000000')).rejects.toThrow(
            'E-mail ou senha inválidos.',
        )
    })
})
