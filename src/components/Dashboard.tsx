import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";

interface DashboardProps {
  user: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  const stats = {
    pareceres_total: 156,
    pareceres_mes: 23,
    pareceres_pendentes: 8,
    pareceres_aprovados: 134,
    usuarios_ativos: 45,
    prescricoes_proximas: 12,
    tempo_medio_parecer: "2.5 dias",
    taxa_aprovacao: 89
  };

  const recentPareceres = [
    {
      id: "001/2024",
      titulo: "Análise de Prescrição - Deserção",
      orgao: "Segurança Pública",
      status: "aprovado",
      data: "2024-01-15",
    },
    {
      id: "002/2024", 
      titulo: "Parecer sobre Insubordinação",
      orgao: "Segurança Pública",
      status: "revisao",
      data: "2024-01-14",
    },
    {
      id: "003/2024",
      titulo: "Análise de Peculato - Servidor",
      orgao: "Ressocialização",
      status: "rascunho",
      data: "2024-01-13",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
      case "revisao":
        return <Badge className="bg-yellow-100 text-yellow-800">Em Revisão</Badge>;
      case "rascunho":
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getOrgaoBadge = (orgao: string) => {
    const colors = {
      "Segurança Pública": "bg-blue-100 text-blue-800",
      "Investigação": "bg-green-100 text-green-800", 
      "Ressocialização": "bg-purple-100 text-purple-800",
      "Emergências": "bg-red-100 text-red-800"
    };
    return <Badge className={colors[orgao as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{orgao}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Bem-vindo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Bem-vindo, {user?.nome || "Usuário"}!
        </h2>
        <p className="text-blue-100">
          Painel de controle do NOBILIS-IA
        </p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pareceres Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pareceres_total}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.pareceres_mes} este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pareceres_pendentes}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando revisão
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.taxa_aprovacao}%</div>
            <Progress value={stats.taxa_aprovacao} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescrições Próximas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.prescricoes_proximas}</div>
            <p className="text-xs text-muted-foreground">
              Próximas de prescrever
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pareceres Recentes e Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pareceres Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Pareceres Recentes</CardTitle>
            <CardDescription>
              Últimos pareceres criados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPareceres.map((parecer) => (
                <div key={parecer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">#{parecer.id}</span>
                      {getOrgaoBadge(parecer.orgao)}
                    </div>
                    <p className="text-sm text-gray-900 font-medium mb-1">
                      {parecer.titulo}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(parecer.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(parecer.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
            <CardDescription>
              Indicadores de produtividade do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Tempo Médio por Parecer</span>
                </div>
                <span className="font-semibold">{stats.tempo_medio_parecer}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Usuários Ativos</span>
                </div>
                <span className="font-semibold">{stats.usuarios_ativos}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Aprovados</span>
                </div>
                <span className="font-semibold">{stats.pareceres_aprovados}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">Meta Mensal</span>
                </div>
                <span className="font-semibold">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="h-2 w-2 bg-red-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  {stats.prescricoes_proximas} casos próximos da prescrição
                </p>
                <p className="text-xs text-red-600">
                  Requer atenção imediata
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  {stats.pareceres_pendentes} pareceres aguardando revisão
                </p>
                <p className="text-xs text-yellow-600">
                  Revisar quando possível
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">
                  Sistema operando normalmente
                </p>
                <p className="text-xs text-blue-600">
                  Todas as integrações ativas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
