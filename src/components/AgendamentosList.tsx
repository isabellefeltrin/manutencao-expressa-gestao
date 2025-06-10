
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Plus, Search, Filter } from "lucide-react";
import { toast } from "sonner";

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      dataPrevista: "2024-06-10",
      horaPrevista: "14:00",
      maquina: "Torno CNC-001",
      tecnico: "João Silva",
      tipoManutencao: "Preventiva",
      status: "Agendado"
    },
    {
      id: 2,
      dataPrevista: "2024-06-10",
      horaPrevista: "16:30",
      maquina: "Prensa-002",
      tecnico: "Maria Santos",
      tipoManutencao: "Corretiva",
      status: "Em Andamento"
    },
    {
      id: 3,
      dataPrevista: "2024-06-11",
      horaPrevista: "09:00",
      maquina: "Fresadora-003",
      tecnico: "Pedro Costa",
      tipoManutencao: "Preventiva",
      status: "Agendado"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [novoAgendamento, setNovoAgendamento] = useState({
    dataPrevista: "",
    horaPrevista: "",
    maquina: "",
    tecnico: "",
    tipoManutencao: "",
    status: "Agendado"
  });

  const filteredAgendamentos = agendamentos.filter(agendamento => {
    const matchesSearch = agendamento.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agendamento.tecnico.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "todos" || agendamento.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleNovoAgendamento = () => {
    if (!novoAgendamento.dataPrevista || !novoAgendamento.horaPrevista || !novoAgendamento.maquina) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const id = Math.max(...agendamentos.map(a => a.id)) + 1;
    setAgendamentos([...agendamentos, { ...novoAgendamento, id }]);
    setNovoAgendamento({
      dataPrevista: "",
      horaPrevista: "",
      maquina: "",
      tecnico: "",
      tipoManutencao: "",
      status: "Agendado"
    });
    toast.success("Agendamento criado com sucesso!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Agendado":
        return <Badge variant="default">{status}</Badge>;
      case "Em Andamento":
        return <Badge variant="secondary">{status}</Badge>;
      case "Concluído":
        return <Badge variant="default" className="bg-green-500">{status}</Badge>;
      case "Cancelado":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendamentos de Manutenção</CardTitle>
              <CardDescription>Gerencie todos os agendamentos de manutenção</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Novo Agendamento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="data" className="text-right">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      className="col-span-3"
                      value={novoAgendamento.dataPrevista}
                      onChange={(e) => setNovoAgendamento({...novoAgendamento, dataPrevista: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hora" className="text-right">Hora</Label>
                    <Input
                      id="hora"
                      type="time"
                      className="col-span-3"
                      value={novoAgendamento.horaPrevista}
                      onChange={(e) => setNovoAgendamento({...novoAgendamento, horaPrevista: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maquina" className="text-right">Máquina</Label>
                    <Select
                      value={novoAgendamento.maquina}
                      onValueChange={(value) => setNovoAgendamento({...novoAgendamento, maquina: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione a máquina" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Torno CNC-001">Torno CNC-001</SelectItem>
                        <SelectItem value="Prensa-002">Prensa-002</SelectItem>
                        <SelectItem value="Fresadora-003">Fresadora-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tecnico" className="text-right">Técnico</Label>
                    <Select
                      value={novoAgendamento.tecnico}
                      onValueChange={(value) => setNovoAgendamento({...novoAgendamento, tecnico: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="João Silva">João Silva</SelectItem>
                        <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                        <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tipo" className="text-right">Tipo</Label>
                    <Select
                      value={novoAgendamento.tipoManutencao}
                      onValueChange={(value) => setNovoAgendamento({...novoAgendamento, tipoManutencao: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Tipo de manutenção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Preventiva">Preventiva</SelectItem>
                        <SelectItem value="Corretiva">Corretiva</SelectItem>
                        <SelectItem value="Preditiva">Preditiva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleNovoAgendamento} className="w-full">
                  Criar Agendamento
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por máquina ou técnico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Agendado">Agendado</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredAgendamentos.map((agendamento) => (
              <Card key={agendamento.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{agendamento.maquina}</h3>
                        <p className="text-sm text-muted-foreground">{agendamento.tecnico}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{agendamento.dataPrevista}</span>
                        <Clock className="h-4 w-4" />
                        <span>{agendamento.horaPrevista}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{agendamento.tipoManutencao}</Badge>
                      {getStatusBadge(agendamento.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendamentosList;
