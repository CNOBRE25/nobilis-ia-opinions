
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (authenticated: boolean) => void;
  onUserChange: (user: any) => void;
}

const LoginForm = ({ onLogin, onUserChange }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgao, setOrgao] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular login (em produção seria integrado com Supabase Auth)
    setTimeout(() => {
      if (email && password && orgao) {
        const user = {
          id: "123",
          nome: "Usuário Demonstração",
          email,
          orgao,
          categoria_acesso: "servidor_civil",
        };
        
        onUserChange(user);
        onLogin(true);
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo ao NOBILIS-IA`,
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border-white/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Acesso ao Sistema</CardTitle>
        <CardDescription className="text-gray-600">
          Entre com suas credenciais para acessar o NOBILIS-IA
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@orgao.pe.gov.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgao">Órgão</Label>
            <Select value={orgao} onValueChange={setOrgao} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu órgão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="policia_militar">Polícia Militar de Pernambuco</SelectItem>
                <SelectItem value="policia_civil">Polícia Civil de Pernambuco</SelectItem>
                <SelectItem value="ressocializacao">Secretaria de Ressocialização</SelectItem>
                <SelectItem value="bombeiros">Corpo de Bombeiros Militar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar no Sistema"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Problemas com acesso?{" "}
            <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
              Contate o suporte
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
