import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginPage } from '../ui/login-page'

const {
  mockNavigate,
  mockCreateGuestSession,
  mockSetUser,
  mockLogin,
  mockToastError,
} = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockCreateGuestSession: vi.fn(),
  mockSetUser: vi.fn(),
  mockLogin: vi.fn(),
  mockToastError: vi.fn(),
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('sonner', () => ({
  toast: {
    error: mockToastError,
  },
}))

vi.mock('@/entities/session', () => ({
  useCreateGuestSession: () => ({
    refetch: mockCreateGuestSession,
  }),
  useSessionStore: (
    selector: (state: { setUser: typeof mockSetUser }) => unknown,
  ) => selector({ setUser: mockSetUser }),
}))

vi.mock('@/features/auth', () => ({
  login: (...args: [string, string]) => mockLogin(...args),
}))

vi.mock('@/shared/assets', () => ({
  CineDashLogo: () => <div data-testid="logo" />,
}))

vi.mock('@/shared/ui/text-field', () => ({
  TextField: ({
    id,
    label,
    error,
    ...props
  }: {
    id: string
    label: string
    error?: { message?: string }
    [key: string]: unknown
  }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {error?.message ? <span>{error.message}</span> : null}
    </div>
  ),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    mockCreateGuestSession.mockResolvedValue({})
    mockLogin.mockResolvedValue({
      name: 'Lucca Covre',
      email: 'lucca.covre@exemplo.com',
    })
  })

  it('should render login form fields', () => {
    render(<LoginPage />)

    expect(screen.getByTestId('logo')).toBeTruthy()
    expect(screen.getByLabelText('E-mail')).toBeTruthy()
    expect(screen.getByLabelText('Senha')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy()
  })

  it('should show schema validation error when submitting invalid data', async () => {
    render(<LoginPage />)

    fireEvent.input(screen.getByLabelText('E-mail'), {
      target: { value: 'lucca.covre@exemplo.com' },
    })
    fireEvent.input(screen.getByLabelText('Senha'), {
      target: { value: '123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(
      await screen.findByText('A senha deve ter pelo menos 6 caracteres'),
    ).toBeTruthy()
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('should submit, create guest session and navigate on success', async () => {
    render(<LoginPage />)

    fireEvent.input(screen.getByLabelText('E-mail'), {
      target: { value: 'lucca.covre@exemplo.com' },
    })
    fireEvent.input(screen.getByLabelText('Senha'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'lucca.covre@exemplo.com',
        '123456',
      )
    })

    expect(mockCreateGuestSession).toHaveBeenCalledWith({ throwOnError: true })
    expect(mockSetUser).toHaveBeenCalledWith({
      name: 'Lucca Covre',
      email: 'lucca.covre@exemplo.com',
    })
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/discover' })
    expect(mockToastError).not.toHaveBeenCalled()
  })
})
