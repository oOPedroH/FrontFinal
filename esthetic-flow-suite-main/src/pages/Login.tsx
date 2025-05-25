import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  // Estados para login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Estados para cadastro
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  // Handler de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler de cadastro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setTimeout(() => {
      toast({
        title: 'Cadastro não implementado',
        description: 'Esta funcionalidade será implementada com Supabase.',
      });
      setRegisterLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-light px-4">
      <Card className="w-full max-w-md border-gold/20 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Área do Cliente</CardTitle>
          <CardDescription>
            Faça login ou cadastre-se para acessar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    placeholder="seu@email.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Senha
                    </label>
                  </div>
                  <Input
                    id="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></span>
                      Entrando...
                    </span>
                  ) : 'Entrar'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="register-name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="register-name"
                    placeholder="Seu nome completo"
                    required
                    value={registerData.name}
                    onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
                    disabled={registerLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <Input
                    id="register-email"
                    placeholder="seu@email.com"
                    required
                    type="email"
                    value={registerData.email}
                    onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                    disabled={registerLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-phone" className="text-sm font-medium">
                    Telefone
                  </label>
                  <Input
                    id="register-phone"
                    placeholder="(11) 99999-9999"
                    type="tel"
                    value={registerData.phone}
                    onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
                    disabled={registerLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Input
                    id="register-password"
                    required
                    type="password"
                    value={registerData.password}
                    onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                    disabled={registerLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-confirm-password" className="text-sm font-medium">
                    Confirmar Senha
                  </label>
                  <Input
                    id="register-confirm-password"
                    required
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    disabled={registerLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-white"
                  disabled={registerLoading}
                >
                  {registerLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></span>
                      Cadastrando...
                    </span>
                  ) : 'Cadastrar'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gold hover:underline">
              Voltar para o site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
