
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Plus, Search, Clock, User, Wrench } from "lucide-react";
import { toast } from "sonner";

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      data: "2023-11-15",
      hora: "09:00",
      maquina: "Injetora 100T",
      tecnico: "Fernando Lima",
      tipoManutencao: "Manutenção Preventiva",
      status: "Agendado"
    },
    {
      id: 2,
      data: "2023-11-16",
      hora: "14:00",
      maquina: "Torno CNC",
      tecnico: "Patricia Rocha",
      tipoManutencao: "Manutenção Corretiva",
      status: "Agendado"
    },
    {
      id: 3,
      data: "2023-11-17",
      hora: "10:30",
      maquina: "Fresadora Universal",
      tecnico: "Ricardo Alves",
      tipoManutencao: "Manutenção Preditiva",
      status: "Agendado"
    },
    {
      id: 4,
      data: "2023-11-18",
      hora: "08:00",
      maquina: "Prensa Hidráulica",
      tecnico: "Juliana Martins",
      tipoManutencao: "Manutenção Preventiva",
      status: "Agendado"
    },
    {
      id: 5,
      data: "2023-11-19",
      hora: "13:00",
      maquina: "Compressor de Ar",
      tecnico: "Marcos Nunes",
      tipoManutencao: "Calibração",
      status: "Agendado"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [novoAgendamento, setNovoAgendamento] = useState({
    data: "",
    hora: "",
    maquina: "",
    tecnico: "",
    tipoManutencao: ""
  });

  const maquinas = ["Injetora 100T", "Torno CNC", "Fresadora Universal", "Prensa Hidráulica", "Compressor de Ar"];
  const tecnicos = ["Fernando Lima", "Patricia Rocha", "Ricardo Alves", "Juliana Martins", "Marcos Nunes"];
  const tiposManutencao = ["Manutenção Preventiva", "Manutenção Corretiva", "Manutenção Preditiva", "Calibração", "Lubrificação"];

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.tecnico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.tipoManutencao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoAgendamento = () => {
    if (!novoAgendamento.data || !novoAgendamento.hora || !novoAgendamento.maquina || !novoAgendamento.tecnico) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const id = Math.max(...agendamentos.map(a => a.id)) + 1;
    setAgendamentos([...agendamentos, {
      ...novoAgendamento,
      id,
      status: "Agendado"
    }]);
    setNovoAgendamento({
      data: "",
      hora: "",
      maquina: "",
      tecnico: "",
      tipoManutencao: ""
    });
    toast.success("Agendamento criado com sucesso!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendado": return "default";
      case "Em Andamento": return "secondary";
      case "Concluído": return "default";
      case "Cancelado": return "destructive";
      case "Pendente": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendamentos de Manutenção</CardTitle>
              <CardDescription>Programação e controle de manutenções</CardDescription>
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
                  <DialogTitle>Agendar Manutenção</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="data" className="text-right">Data *</Label>
                    <Input
                      id="data"
                      type="date"
                      className="col-span-3"
                      value={novoAgendamento.data}
                      onChange={(e) => setNovoAgendamento({...novoAgendamento, data: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hora" className="text-right">Hora *</Label>
                    <Input
                      id="hora"
                      type="time"
                      className="col-span-3"
                      value={novoAgendamento.hora}
                      onChange={(e) => setNovoAgendamento({...novoAgendamento, hora: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maquina" className="text-right">Máquina *</Label>
                    <Select
                      value={novoAgendamento.maquina}
                      onValueChange={(value) => setNovoAgendamento({...novoAgendamento, maquina: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione a máquina" />
                      </SelectTrigger>
                      <SelectContent>
                        {maquinas.map(maquina => (
                          <SelectItem key={maquina} value={maquina}>{maquina}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tecnico" className="text-right">Técnico *</Label>
                    <Select
                      value={novoAgendamento.tecnico}
                      onValueChange={(value) => setNovoAgendamento({...novoAgendamento, tecnico: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        {tecnicos.map(tecnico => (
                          <SelectItem key={tecnico} value={tecnico}>{tecnico}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tipoManutencao" className="text-right">Tipo</Label>
                    <Select
                      value={novoAgendamento.tipoManutencao}
                      onValueChange={(value) => setNovoAgendamento({...novoAgendamento, tipoManutencao: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Tipo de manutenção" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposManutencao.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleNovoAgendamento} className="w-full">
                  Agendar Manutenção
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar agendamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgendamentos.map((agendamento) => (
              <Card key={agendamento.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <Badge variant={getStatusColor(agendamento.status) as any}>
                      {agendamento.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{agendamento.maquina}</CardTitle>
                  <CardDescription>{agendamento.tipoManutencao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(agendamento.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{agendamento.hora}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{agendamento.tecnico}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <span>{agendamento.tipoManutencao}</span>
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
