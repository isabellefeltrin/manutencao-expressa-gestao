
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Plus, Search, Settings } from "lucide-react";
import { toast } from "sonner";

const MaquinasManager = () => {
  const [maquinas, setMaquinas] = useState([
    {
      id: 1,
      nome: "Torno CNC-001",
      setor: "Produção",
      status: "Operacional"
    },
    {
      id: 2,
      nome: "Prensa-002",
      setor: "Produção",
      status: "Manutenção"
    },
    {
      id: 3,
      nome: "Fresadora-003",
      setor: "Usinagem",
      status: "Operacional"
    },
    {
      id: 4,
      nome: "Solda MIG-004",
      setor: "Soldagem",
      status: "Operacional"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [novaMaquina, setNovaMaquina] = useState({
    nome: "",
    setor: ""
  });

  const setores = ["Produção", "Usinagem", "Soldagem", "Montagem", "Qualidade"];
  const statusOptions = ["Operacional", "Manutenção", "Parada", "Inativo"];

  const filteredMaquinas = maquinas.filter(maquina =>
    maquina.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    maquina.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovaMaquina = () => {
    if (!novaMaquina.nome || !novaMaquina.setor) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const id = Math.max(...maquinas.map(m => m.id)) + 1;
    setMaquinas([...maquinas, {
      ...novaMaquina,
      id,
      status: "Operacional"
    }]);
    setNovaMaquina({
      nome: "",
      setor: ""
    });
    toast.success("Máquina cadastrada com sucesso!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Operacional":
        return <Badge variant="default" className="bg-green-500">Operacional</Badge>;
      case "Manutenção":
        return <Badge variant="secondary">Manutenção</Badge>;
      case "Parada":
        return <Badge variant="destructive">Parada</Badge>;
      case "Inativo":
        return <Badge variant="outline">Inativo</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const updateMaquinaStatus = (id: number, novoStatus: string) => {
    setMaquinas(maquinas.map(maquina => 
      maquina.id === id ? { ...maquina, status: novoStatus } : maquina
    ));
    toast.success("Status da máquina atualizado!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Máquinas</CardTitle>
              <CardDescription>Cadastro e controle de máquinas e equipamentos</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Máquina
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Máquina</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">Nome *</Label>
                    <Input
                      id="nome"
                      className="col-span-3"
                      value={novaMaquina.nome}
                      onChange={(e) => setNovaMaquina({...novaMaquina, nome: e.target.value})}
                      placeholder="Nome da máquina"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="setor" className="text-right">Setor *</Label>
                    <Select
                      value={novaMaquina.setor}
                      onValueChange={(value) => setNovaMaquina({...novaMaquina, setor: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent>
                        {setores.map(setor => (
                          <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleNovaMaquina} className="w-full">
                  Cadastrar Máquina
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
                placeholder="Buscar máquinas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMaquinas.map((maquina) => (
              <Card key={maquina.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Wrench className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline">{maquina.setor}</Badge>
                  </div>
                  <CardTitle className="text-lg">{maquina.nome}</CardTitle>
                  <CardDescription>Equipamento Industrial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status atual:</span>
                      {getStatusBadge(maquina.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={maquina.status}
                        onValueChange={(value) => updateMaquinaStatus(maquina.id, value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

export default MaquinasManager;
