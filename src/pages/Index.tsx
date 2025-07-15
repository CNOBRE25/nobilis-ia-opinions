
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Users, BarChart3, AlertTriangle, Scale, BookOpen, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";
import PareceresSection from "@/components/PareceresSection";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-blue-400 mr-4" />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">NOBILIS-IA</h1>
                <p className="text-blue-200 text-lg">Sistema Integrado de Pareceres Jurídicos</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge variant="secondary" className="bg-blue-800 text-blue-100">PMPE</Badge>
              <Badge variant="secondary" className="bg-green-800 text-green-100">PCPE</Badge>
              <Badge variant="secondary" className="bg-purple-800 text-purple-100">SERES</Badge>
              <Badge variant="secondary" className="bg-red-800 text-red-100">BMPE</Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Scale className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <CardTitle className="text-white">IA Jurídica</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-200 text-sm">Pareceres automatizados com ChatGPT-4o Mini</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <CardTitle className="text-white">Gestão Completa</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-200 text-sm">Controle total de pareceres e documentos</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <CardTitle className="text-white">Prescrição</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-200 text-sm">Cálculo automático de prazos prescricionais</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <CardTitle className="text-white">Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-200 text-sm">Relatórios e métricas detalhadas</p>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <div className="max-w-md mx-auto">
            <LoginForm onLogin={setIsAuthenticated} onUserChange={setUser} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NOBILIS-IA</h1>
                <p className="text-sm text-gray-600">Sistema de Pareceres Jurídicos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {user?.orgao || 'PMPE'}
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAuthenticated(false);
                  setUser(null);
                  toast({
                    title: "Logout realizado",
                    description: "Você foi desconectado com sucesso.",
                  });
                }}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="pareceres" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Pareceres
            </TabsTrigger>
            <TabsTrigger value="legislacao" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Legislação
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard user={user} />
          </TabsContent>

          <TabsContent value="pareceres">
            <PareceresSection user={user} />
          </TabsContent>

          <TabsContent value="legislacao">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Legislação</h3>
              <p className="text-gray-600">Módulo de legislação em desenvolvimento</p>
            </div>
          </TabsContent>

          <TabsContent value="usuarios">
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestão de Usuários</h3>
              <p className="text-gray-600">Módulo de usuários em desenvolvimento</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
