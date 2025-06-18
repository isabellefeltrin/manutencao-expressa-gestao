
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, User, Wrench, DollarSign, Package, Tool } from "lucide-react";

const ExecucoesView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dados simulados das execuções do mês atual
  const execucoes = [
    {
      id: 1,
      dataRealizada: "2023-11-15",
      horasTermino: "11:30",
      valorExec: 250.00,
      agendamento: {
        dataPrevista: "2023-11-15",
        horaPrevista: "09:00",
        maquina: "Injetora 100T",
        tecnico: "Fernando Lima",
        tipoManutencao: "Manutenção Preventiva",
        status: "Concluído"
      },
      materiais: [
        { nome: "Parafuso sextavado 10mm", quantidade: 10, valorUnit: 0.50 }
      ],
      ferramentas: [
        { nome: "Chave de fenda", quantidade: 2 },
        { nome: "Martelo", quantidade: 1 }
      ]
    },
    {
      id: 2,
      dataRealizada: "2023-11-16",
      horasTermino: "16:45",
      valorExec: 320.50,
      agendamento: {
        dataPrevista: "2023-11-16",
        horaPrevista: "14:00",
        maquina: "Torno CNC",
        tecnico: "Patricia Rocha",
        tipoManutencao: "Manutenção Corretiva",
        status: "Concluído"
      },
      materiais: [
        { nome: "Rolamento 6205", quantidade: 1, valorUnit: 25.90 }
      ],
      ferramentas: [
        { nome: "Alicate", quantidade: 1 }
      ]
    },
    {
      id: 3,
      dataRealizada: "2023-11-17",
      horasTermino: "12:15",
      valorExec: 180.75,
      agendamento: {
        dataPrevista: "2023-11-17",
        horaPrevista: "10:30",
        maquina: "Fresadora Universal",
        tecnico: "Ricardo Alves",
        tipoManutencao: "Manutenção Preditiva",
        status: "Concluído"
      },
      materiais: [
        { nome: "Óleo lubrificante", quantidade: 2, valorUnit: 45.75 }
      ],
      ferramentas: [
        { nome: "Chave inglesa", quantidade: 1 }
      ]
    },
    {
      id: 4,
      dataRealizada: "2023-11-18",
      horasTermino: "10:00",
      valorExec: 210.00,
      agendamento: {
        dataPrevista: "2023-11-18",
        horaPrevista: "08:00",
        maquina: "Prensa Hidráulica",
        tecnico: "Juliana Martins",
        tipoManutencao: "Manutenção Preventiva",
        status: "Concluído"
      },
      materiais: [
        { nome: "Filtro de ar", quantidade: 1, valorUnit: 32.20 }
      ],
      ferramentas: [
        { nome: "Multímetro", quantidade: 1 }
      ]
    },
    {
      id: 5,
      dataRealizada: "2023-11-19",
      horasTermino: "15:30",
      valorExec: 275.25,
      agendamento: {
        dataPrevista: "2023-11-19",
        horaPrevista: "13:00",
        maquina: "Compressor de Ar",
        tecnico: "Marcos Nunes",
        tipoManutencao: "Calibração",
        status: "Concluído"
      },
      materiais: [
        { nome: "Correia dentada", quantidade: 1, valorUnit: 68.30 }
      ],
      ferramentas: [
        { nome: "Chave de fenda", quantidade: 1 }
      ]
    }
  ];

  const filteredExecucoes = execucoes.filter(execucao =>
    execucao.agendamento.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    execucao.agendamento.tecnico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    execucao.agendamento.tipoManutencao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    execucao.materiais.some(material => 
      material.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    execucao.ferramentas.some(ferramenta => 
      ferramenta.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "default";
      case "Em Andamento": return "secondary";
      case "Agendado": return "outline";
      case "Cancelado": return "destructive";
      default: return "default";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const totalValorExecucoes = filteredExecucoes.reduce((total, execucao) => total + execucao.valorExec, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Execuções de Manutenção - Novembro 2023
              </CardTitle>
              <CardDescription>
                Relatório completo das manutenções executadas no mês
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalValorExecucoes)}
              </div>
              <div className="text-sm text-muted-foreground">
                Total de {filteredExecucoes.length} execuções
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por máquina, técnico, tipo de manutenção, material ou ferramenta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Máquina</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Materiais</TableHead>
                  <TableHead>Ferramentas</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExecucoes.map((execucao) => (
                  <TableRow key={execucao.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(execucao.dataRealizada).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {execucao.horasTermino}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{execucao.agendamento.maquina}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {execucao.agendamento.tecnico}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{execucao.agendamento.tipoManutencao}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(execucao.agendamento.status) as any}>
                        {execucao.agendamento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {execucao.materiais.map((material, index) => (
                          <div key={index} className="flex items-center gap-1 text-sm">
                            <Package className="h-3 w-3 text-muted-foreground" />
                            <span>{material.nome} ({material.quantidade}x)</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {execucao.ferramentas.map((ferramenta, index) => (
                          <div key={index} className="flex items-center gap-1 text-sm">
                            <Tool className="h-3 w-3 text-muted-foreground" />
                            <span>{ferramenta.nome} ({ferramenta.quantidade}x)</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 font-medium">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        {formatCurrency(execucao.valorExec)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredExecucoes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma execução encontrada com os critérios de busca.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecucoesView;
