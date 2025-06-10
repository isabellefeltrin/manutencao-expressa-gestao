
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Wrench, Package, Users, AlertTriangle, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock data - em um sistema real, estes dados viriam de uma API
  const dashboardStats = {
    manutencoesPendentes: 12,
    manutencoesConcluidas: 45,
    estoqueAlerta: 8,
    tecnicosAtivos: 15,
    maquinasOperacionais: 98
  };

  const agendamentosProximos = [
    { id: 1, maquina: "Torno CNC-001", tecnico: "João Silva", data: "2024-06-10", hora: "14:00", tipo: "Preventiva" },
    { id: 2, maquina: "Prensa-002", tecnico: "Maria Santos", data: "2024-06-10", hora: "16:30", tipo: "Corretiva" },
    { id: 3, maquina: "Fresadora-003", tecnico: "Pedro Costa", data: "2024-06-11", hora: "09:00", tipo: "Preventiva" }
  ];

  const materiaisAlerta = [
    { nome: "Óleo Hidráulico ISO 46", estoque: 5, limite: 10 },
    { nome: "Correia Dentada 8M", estoque: 2, limite: 5 },
    { nome: "Rolamento 6204", estoque: 3, limite: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manutenções Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{dashboardStats.manutencoesPendentes}</div>
            <p className="text-xs text-muted-foreground">
              Agendadas para hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas (Mês)</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardStats.manutencoesConcluidas}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Itens em Alerta</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dashboardStats.estoqueAlerta}</div>
            <p className="text-xs text-muted-foreground">
              Estoque abaixo do limite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Técnicos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.tecnicosAtivos}</div>
            <p className="text-xs text-muted-foreground">
              Disponíveis para agendamento
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Manutenções programadas para hoje e amanhã</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agendamentosProximos.map((agendamento) => (
                <div key={agendamento.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{agendamento.maquina}</p>
                    <p className="text-sm text-muted-foreground">{agendamento.tecnico}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{agendamento.data} {agendamento.hora}</p>
                    <Badge variant={agendamento.tipo === "Corretiva" ? "destructive" : "default"}>
                      {agendamento.tipo}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materiais em Alerta</CardTitle>
            <CardDescription>Itens com estoque abaixo do limite mínimo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materiaisAlerta.map((material, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{material.nome}</p>
                    <Badge variant="destructive">
                      {material.estoque}/{material.limite}
                    </Badge>
                  </div>
                  <Progress value={(material.estoque / material.limite) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status Operacional</CardTitle>
          <CardDescription>Eficiência geral das máquinas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Máquinas Operacionais</span>
              <span className="text-sm text-muted-foreground">{dashboardStats.maquinasOperacionais}%</span>
            </div>
            <Progress value={dashboardStats.maquinasOperacionais} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
