
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Search, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const EstoqueManager = () => {
  const [materiais, setMateriais] = useState([
    {
      id: 1,
      nome: "Óleo Hidráulico ISO 46",
      descricao: "Óleo hidráulico para sistemas de alta pressão",
      valor: 85.50,
      estoque: 5,
      limite: 10
    },
    {
      id: 2,
      nome: "Correia Dentada 8M",
      descricao: "Correia dentada para transmissão de movimento",
      valor: 120.00,
      estoque: 15,
      limite: 5
    },
    {
      id: 3,
      nome: "Rolamento 6204",
      descricao: "Rolamento de esferas para eixos de 20mm",
      valor: 35.75,
      estoque: 3,
      limite: 8
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [novoMaterial, setNovoMaterial] = useState({
    nome: "",
    descricao: "",
    valor: "",
    estoque: "",
    limite: ""
  });

  const filteredMateriais = materiais.filter(material =>
    material.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoMaterial = () => {
    if (!novoMaterial.nome || !novoMaterial.valor || !novoMaterial.estoque) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const id = Math.max(...materiais.map(m => m.id)) + 1;
    setMateriais([...materiais, {
      ...novoMaterial,
      id,
      valor: parseFloat(novoMaterial.valor),
      estoque: parseInt(novoMaterial.estoque),
      limite: parseInt(novoMaterial.limite || "0")
    }]);
    setNovoMaterial({
      nome: "",
      descricao: "",
      valor: "",
      estoque: "",
      limite: ""
    });
    toast.success("Material adicionado com sucesso!");
  };

  const getStatusEstoque = (estoque: number, limite: number) => {
    if (estoque <= limite) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Baixo
      </Badge>;
    } else if (estoque <= limite * 1.5) {
      return <Badge variant="secondary">Médio</Badge>;
    } else {
      return <Badge variant="default" className="bg-green-500">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Estoque</CardTitle>
              <CardDescription>Controle de materiais e peças de reposição</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Material
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Material</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome" className="text-right">Nome *</Label>
                    <Input
                      id="nome"
                      className="col-span-3"
                      value={novoMaterial.nome}
                      onChange={(e) => setNovoMaterial({...novoMaterial, nome: e.target.value})}
                      placeholder="Nome do material"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descricao" className="text-right">Descrição</Label>
                    <Textarea
                      id="descricao"
                      className="col-span-3"
                      value={novoMaterial.descricao}
                      onChange={(e) => setNovoMaterial({...novoMaterial, descricao: e.target.value})}
                      placeholder="Descrição do material"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valor" className="text-right">Valor *</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      value={novoMaterial.valor}
                      onChange={(e) => setNovoMaterial({...novoMaterial, valor: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="estoque" className="text-right">Estoque *</Label>
                    <Input
                      id="estoque"
                      type="number"
                      className="col-span-3"
                      value={novoMaterial.estoque}
                      onChange={(e) => setNovoMaterial({...novoMaterial, estoque: e.target.value})}
                      placeholder="Quantidade em estoque"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="limite" className="text-right">Limite Mín.</Label>
                    <Input
                      id="limite"
                      type="number"
                      className="col-span-3"
                      value={novoMaterial.limite}
                      onChange={(e) => setNovoMaterial({...novoMaterial, limite: e.target.value})}
                      placeholder="Limite mínimo"
                    />
                  </div>
                </div>
                <Button onClick={handleNovoMaterial} className="w-full">
                  Adicionar Material
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
                placeholder="Buscar materiais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMateriais.map((material) => (
              <Card key={material.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    {getStatusEstoque(material.estoque, material.limite)}
                  </div>
                  <CardTitle className="text-lg">{material.nome}</CardTitle>
                  <CardDescription className="text-sm">{material.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valor Unitário:</span>
                      <span className="font-medium">R$ {material.valor.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Em Estoque:</span>
                      <span className="font-medium">{material.estoque} unidades</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Limite Mínimo:</span>
                      <span className="font-medium">{material.limite} unidades</span>
                    </div>
                    <div className="flex justify-between font-medium text-sm">
                      <span>Valor Total:</span>
                      <span>R$ {(material.valor * material.estoque).toFixed(2)}</span>
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

export default EstoqueManager;
