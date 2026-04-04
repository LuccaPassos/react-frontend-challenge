const MOCK_ACCOUNT = {
    name: 'Lucca Covre',
    email: 'lucca.covre@exemplo.com',
    password: '123456',
} as const

export type MockSessionUser = {
    name: string
    email: string
}

export const login = async (
    email: string,
    password: string,
): Promise<MockSessionUser> => {
    const normalizedEmail = email.trim().toLowerCase()

    if (
        normalizedEmail !== MOCK_ACCOUNT.email ||
        password !== MOCK_ACCOUNT.password
    ) {
        throw new Error('E-mail ou senha inválidos.')
    }

    return {
        name: MOCK_ACCOUNT.name,
        email: MOCK_ACCOUNT.email,
    }
}