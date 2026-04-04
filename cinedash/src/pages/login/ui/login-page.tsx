import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateGuestSession, useSessionStore } from '@/entities/session'
import { CineDashLogo } from '@/shared/assets'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { FieldGroup } from '@/shared/ui/field'
import { Spinner } from '@/shared/ui/spinner'
import { TextField } from '@/shared/ui/text-field'

import { login } from '../api/auth/login'
import type { LoginFormSchema } from '../model/login-schema'
import { loginSchema } from '../model/login-schema'

export function LoginPage() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  const { refetch: createGuestSession } = useCreateGuestSession()
  const setUser = useSessionStore((state) => state.setUser)

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      const user = await login(data.email, data.password)
      await createGuestSession({ throwOnError: true })
      setUser(user)
      navigate({ to: '/discover' })
    } catch (err) {
      console.error('Login failed', err)
      if (err instanceof Error) {
        toast.error(`Falha no login. ${err.message}`)
      }
    }
  }

  return (
    <div className="login">
      <CineDashLogo />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>
            Preencha com suas credenciais para explorar os filmes!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} id="login-form">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="E-mail"
                    type="email"
                    placeholder="meu-email@examplo.com"
                    required
                    error={fieldState.error}
                  />
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id="password"
                    label="Senha"
                    type="password"
                    placeholder="••••••••"
                    required
                    error={fieldState.error}
                  />
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-5">
          <div className="flex-col gap-2 flex w-full">
            <Button
              type="submit"
              form="login-form"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner data-icon="inline-start" />
              )}
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login com Google
            </Button> */}
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className="text-muted-foreground">Não tem uma conta?</p>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary font-bold"
            >
              Criar conta
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
