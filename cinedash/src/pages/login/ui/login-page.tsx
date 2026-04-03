import CineDashLogo from '@/shared/assets/cinedash-logo.svg?react'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export function LoginPage() {
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  {/* <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary font-bold"
                    >
                      Esqueci minha senha
                    </a> */}
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-5">
          <div className="flex-col gap-2 flex w-full">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login com Google
            </Button>
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
