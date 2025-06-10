
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Building, Plus, Search, Users, Wrench } from "lucide-react";
import { toast } from "sonner";

const SetoresManager = () => {
  const [setores, setSetores] = useState([
    {
      id: 1,
      nome: "Produção",
      tecnicos: 8,
      maquinas: 15,
      gerente: "Carlos Oliveira"
    },
    {
      id: 2,
      nome: "Manutenção",
      tecnicos: 5,
      maquinas: 0,
      gerente: "Ana Pereira"
    },
    {
      id: 3,
      nome: "Usinagem",
      tecnicos: 6,
      maquinas: 8,
      gerente: "Roberto Silva"
    },
    {
      id: 4,
      nome: "Soldagem",
      tecnicos: 4,
      maquinas: 3,
      gerente: "Fernanda Costa"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [novoSetor, setNovoSetor] = useState({
    nome: "",
    gerente: ""
  });

  const filteredSetores = setores.filter(setor =>
    setor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setor.gerente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoSetor = () => {
    if (!novoSetor.nome) {
      toast.error("Nome do setor é obrigatório");
      return;
    }

    const id = Math.max(...setores.map(s => s.id)) + 1;
    setSetores([...setores, {
      ...novoSetor,
      id,
      tecnicos: 0,
      maquinas: 0
    }]);
    setNovoSetor({
      nome: "",
      gerente: ""
    });
    toast.success("Setor cadastrado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Setores</CardTitle>
              <CardDescription>Organização e controle de setores produtivos</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Setor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Setor</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">Nome *</Label>
                    <Input
                      id="nome"
                      className="col-span-3"
                      value={novoSetor.nome}
                      onChange={(e) => setNovoSetor({...novoSetor, nome: e.target.value})}
                      placeholder="Nome do setor"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gerente" className="text-right">Gerente</Label>
                    <Input
                      id="gerente"
                      className="col-span-3"
                      value={novoSetor.gerente}
                      onChange={(e) => setNovoSetor({...novoSetor, gerente: e.target.value})}
                      placeholder="Nome do gerente"
                    />
                  </div>
                </div>
                <Button onClick={handleNovoSetor} className="w-full">
                  Cadastrar Setor
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
                placeholder="Buscar setores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSetores.map((setor) => (
              <Card key={setor.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">{setor.nome}</CardTitle>
                  <CardDescription>
                    {setor.gerente ? `Gerente: ${setor.gerente}` : "Sem gerente definido"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Técnicos:</span>
                      </div>
                      <span className="font-medium">{setor.tecnicos}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Máquinas:</span>
                      </div>
                      <span className="font-medium">{setor.maquinas}</span>
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

export default SetoresManager;
