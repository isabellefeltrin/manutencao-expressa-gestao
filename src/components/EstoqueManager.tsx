
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Search, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const EstoqueManager = () => {
  const [materiais, setMateriais] = useState([
    {
      id: 1,
      nome: "Parafuso sextavado 10mm",
      descricao: "Parafuso de aço inox sextavado 10mm",
      valor: 0.50,
      estoque: 500,
      estoqueMinimo: 1000
    },
    {
      id: 2,
      nome: "Rolamento 6205",
      descricao: "Rolamento de esfera 6205",
      valor: 25.90,
      estoque: 20,
      estoqueMinimo: 50
    },
    {
      id: 3,
      nome: "Óleo lubrificante",
      descricao: "Óleo lubrificante industrial 20W-50",
      valor: 45.75,
      estoque: 30,
      estoqueMinimo: 100
    },
    {
      id: 4,
      nome: "Filtro de ar",
      descricao: "Filtro de ar para máquinas industriais",
      valor: 32.20,
      estoque: 15,
      estoqueMinimo: 30
    },
    {
      id: 5,
      nome: "Correia dentada",
      descricao: "Correia dentada tipo B 850mm",
      valor: 68.30,
      estoque: 8,
      estoqueMinimo: 20
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [novoMaterial, setNovoMaterial] = useState({
    nome: "",
    descricao: "",
    valor: "",
    estoque: "",
    estoqueMinimo: ""
  });

  const filteredMateriais = materiais.filter(material =>
    material.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNovoMaterial = () => {
    if (!novoMaterial.nome || !novoMaterial.valor) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const id = Math.max(...materiais.map(m => m.id)) + 1;
    setMateriais([...materiais, {
      ...novoMaterial,
      id,
      valor: parseFloat(novoMaterial.valor),
      estoque: parseInt(novoMaterial.estoque) || 0,
      estoqueMinimo: parseInt(novoMaterial.estoqueMinimo) || 0
    }]);
    setNovoMaterial({
      nome: "",
      descricao: "",
      valor: "",
      estoque: "",
      estoqueMinimo: ""
    });
    toast.success("Material cadastrado com sucesso!");
  };

  const getStatusEstoque = (estoque: number, estoqueMinimo: number) => {
    const percentual = (estoque / estoqueMinimo) * 100;
    if (percentual <= 50) return { status: "crítico", color: "destructive", icon: AlertTriangle };
    if (percentual <= 80) return { status: "baixo", color: "secondary", icon: TrendingDown };
    return { status: "normal", color: "default", icon: TrendingUp };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Estoque</CardTitle>
              <CardDescription>Controle de materiais e componentes</CardDescription>
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
                  <DialogTitle>Cadastrar Material</DialogTitle>
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
                    <Label htmlFor="estoque" className="text-right">Estoque</Label>
                    <Input
                      id="estoque"
                      type="number"
                      className="col-span-3"
                      value={novoMaterial.estoque}
                      onChange={(e) => setNovoMaterial({...novoMaterial, estoque: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="estoqueMinimo" className="text-right">Estoque Mín.</Label>
                    <Input
                      id="estoqueMinimo"
                      type="number"
                      className="col-span-3"
                      value={novoMaterial.estoqueMinimo}
                      onChange={(e) => setNovoMaterial({...novoMaterial, estoqueMinimo: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
                <Button onClick={handleNovoMaterial} className="w-full">
                  Cadastrar Material
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
            {filteredMateriais.map((material) => {
              const statusInfo = getStatusEstoque(material.estoque, material.estoqueMinimo);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card key={material.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <Badge variant={statusInfo.color as any}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusInfo.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{material.nome}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valor unitário:</span>
                        <span className="font-medium">R$ {material.valor.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estoque atual:</span>
                        <span className="font-medium">{material.estoque}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estoque mínimo:</span>
                        <span className="font-medium">{material.estoqueMinimo}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Valor total:</span>
                        <span className="font-bold">R$ {(material.valor * material.estoque).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstoqueManager;
