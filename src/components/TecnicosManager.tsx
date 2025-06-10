
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Plus, Search, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";

const TecnicosManager = () => {
  const [tecnicos, setTecnicos] = useState([
    {
      id: 1,
      nome: "Fernando Lima",
      dataNasc: "1990-02-20",
      valorHora: 35.50,
      cpf: "111.222.333-44",
      telefone: "(11) 9444-3333"
    },
    {
      id: 2,
      nome: "Patricia Rocha",
      dataNasc: "1988-06-15",
      valorHora: 38.75,
      cpf: "222.333.444-55",
      telefone: "(11) 9333-2222"
    },
    {
      id: 3,
      nome: "Ricardo Alves",
      dataNasc: "1992-09-30",
      valorHora: 32.00,
      cpf: "333.444.555-66",
      telefone: "(11) 9222-1111"
    },
    {
      id: 4,
      nome: "Juliana Martins",
      dataNasc: "1987-04-25",
      valorHora: 40.00,
      cpf: "444.555.666-77",
      telefone: "(11) 9111-0000"
    },
    {
      id: 5,
      nome: "Marcos Nunes",
      dataNasc: "1991-12-05",
      valorHora: 36.25,
      cpf: "555.666.777-88",
      telefone: "(11) 9000-9999"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [novoTecnico, setNovoTecnico] = useState({
    nome: "",
    dataNasc: "",
    valorHora: "",
    cpf: "",
    telefone: ""
  });

  const filteredTecnicos = tecnicos.filter(tecnico =>
    tecnico.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoTecnico = () => {
    if (!novoTecnico.nome || !novoTecnico.valorHora) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const id = Math.max(...tecnicos.map(t => t.id)) + 1;
    setTecnicos([...tecnicos, {
      ...novoTecnico,
      id,
      valorHora: parseFloat(novoTecnico.valorHora)
    }]);
    setNovoTecnico({
      nome: "",
      dataNasc: "",
      valorHora: "",
      cpf: "",
      telefone: ""
    });
    toast.success("Técnico cadastrado com sucesso!");
  };

  const calcularIdade = (dataNasc: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAniversario = hoje.getMonth() - nascimento.getMonth();
    
    if (mesAniversario < 0 || (mesAniversario === 0 && hoje.getDate() < nascimento.getDate())) {
      return idade - 1;
    }
    return idade;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Técnicos Externos</CardTitle>
              <CardDescription>Cadastro e controle de técnicos terceirizados</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Técnico
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Técnico Externo</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">Nome *</Label>
                    <Input
                      id="nome"
                      className="col-span-3"
                      value={novoTecnico.nome}
                      onChange={(e) => setNovoTecnico({...novoTecnico, nome: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dataNasc" className="text-right">Nascimento</Label>
                    <Input
                      id="dataNasc"
                      type="date"
                      className="col-span-3"
                      value={novoTecnico.dataNasc}
                      onChange={(e) => setNovoTecnico({...novoTecnico, dataNasc: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valorHora" className="text-right">Valor/Hora *</Label>
                    <Input
                      id="valorHora"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      value={novoTecnico.valorHora}
                      onChange={(e) => setNovoTecnico({...novoTecnico, valorHora: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cpf" className="text-right">CPF</Label>
                    <Input
                      id="cpf"
                      className="col-span-3"
                      value={novoTecnico.cpf}
                      onChange={(e) => setNovoTecnico({...novoTecnico, cpf: e.target.value})}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="telefone" className="text-right">Telefone</Label>
                    <Input
                      id="telefone"
                      className="col-span-3"
                      value={novoTecnico.telefone}
                      onChange={(e) => setNovoTecnico({...novoTecnico, telefone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                <Button onClick={handleNovoTecnico} className="w-full">
                  Cadastrar Técnico
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
                placeholder="Buscar técnicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTecnicos.map((tecnico) => (
              <Card key={tecnico.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline">Terceirizado</Badge>
                  </div>
                  <CardTitle className="text-lg">{tecnico.nome}</CardTitle>
                  <CardDescription>Técnico Externo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tecnico.dataNasc && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{calcularIdade(tecnico.dataNasc)} anos</span>
                      </div>
                    )}
                    {tecnico.telefone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{tecnico.telefone}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2">
                      <span className="text-sm text-muted-foreground">Valor/Hora:</span>
                      <span className="font-medium">R$ {tecnico.valorHora.toFixed(2)}</span>
                    </div>
                    {tecnico.cpf && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CPF:</span>
                        <span className="text-sm">{tecnico.cpf}</span>
                      </div>
                    )}
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

export default TecnicosManager;
