
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Users, Plus, Search, Phone, Calendar, Edit, Trash2, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Tecnico {
  id_tecnico: number;
  nome_tecnico: string;
  cod_setor: number | null;
  datanasc: string;
  valorhora: number;
  cpf: string;
  telefone: string;
}

interface Setor {
  id_setor: number;
  nome_setor: string;
}

const TecnicosManager = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTecnico, setEditingTecnico] = useState<Tecnico | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome_tecnico: "",
    cod_setor: "",
    datanasc: "",
    valorhora: "",
    cpf: "",
    telefone: ""
  });

  useEffect(() => {
    fetchTecnicos();
    fetchSetores();
  }, []);

  const fetchTecnicos = async () => {
    try {
      const { data, error } = await supabase
        .from('tecnico')
        .select('*')
        .order('id_tecnico');

      if (error) throw error;
      setTecnicos(data || []);
    } catch (error) {
      console.error('Erro ao buscar técnicos:', error);
      toast.error('Erro ao carregar técnicos');
    } finally {
      setLoading(false);
    }
  };

  const fetchSetores = async () => {
    try {
      const { data, error } = await supabase
        .from('setor')
        .select('*')
        .order('id_setor');

      if (error) throw error;
      setSetores(data || []);
    } catch (error) {
      console.error('Erro ao buscar setores:', error);
      toast.error('Erro ao carregar setores');
    }
  };

  const filteredTecnicos = tecnicos.filter(tecnico =>
    tecnico.nome_tecnico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnico.cpf?.includes(searchTerm) ||
    tecnico.telefone?.includes(searchTerm)
  );

  const resetForm = () => {
    setFormData({
      nome_tecnico: "",
      cod_setor: "",
      datanasc: "",
      valorhora: "",
      cpf: "",
      telefone: ""
    });
    setEditingTecnico(null);
  };

  const handleOpenDialog = (tecnico?: Tecnico) => {
    if (tecnico) {
      setEditingTecnico(tecnico);
      setFormData({
        nome_tecnico: tecnico.nome_tecnico || "",
        cod_setor: tecnico.cod_setor?.toString() || "",
        datanasc: tecnico.datanasc || "",
        valorhora: tecnico.valorhora?.toString() || "",
        cpf: tecnico.cpf || "",
        telefone: tecnico.telefone || ""
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.nome_tecnico || !formData.valorhora) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const tecnicoData = {
      nome_tecnico: formData.nome_tecnico,
      cod_setor: formData.cod_setor ? parseInt(formData.cod_setor) : null,
      datanasc: formData.datanasc || null,
      valorhora: parseFloat(formData.valorhora),
      cpf: formData.cpf || null,
      telefone: formData.telefone || null
    };

    try {
      if (editingTecnico) {
        const { error } = await supabase
          .from('tecnico')
          .update(tecnicoData)
          .eq('id_tecnico', editingTecnico.id_tecnico);

        if (error) throw error;
        toast.success("Técnico atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from('tecnico')
          .insert([tecnicoData]);

        if (error) throw error;
        toast.success("Técnico cadastrado com sucesso!");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchTecnicos();
    } catch (error) {
      console.error('Erro ao salvar técnico:', error);
      toast.error('Erro ao salvar técnico');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tecnico')
        .delete()
        .eq('id_tecnico', id);

      if (error) throw error;
      toast.success("Técnico removido com sucesso!");
      fetchTecnicos();
    } catch (error) {
      console.error('Erro ao deletar técnico:', error);
      toast.error('Erro ao remover técnico');
    }
  };

  const getSetorNome = (codSetor: number | null) => {
    if (!codSetor) return "Não atribuído";
    const setor = setores.find(s => s.id_setor === codSetor);
    return setor?.nome_setor || "Setor não encontrado";
  };

  const calcularIdade = (dataNasc: string) => {
    if (!dataNasc) return "N/A";
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAniversario = hoje.getMonth() - nascimento.getMonth();
    
    if (mesAniversario < 0 || (mesAniversario === 0 && hoje.getDate() < nascimento.getDate())) {
      return idade - 1;
    }
    return idade;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando técnicos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão de Técnicos</CardTitle>
              <CardDescription>Cadastro, edição e remoção de técnicos</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Técnico
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingTecnico ? "Editar Técnico" : "Cadastrar Técnico"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nome_tecnico" className="text-right">Nome *</Label>
                    <Input
                      id="nome_tecnico"
                      className="col-span-3"
                      value={formData.nome_tecnico}
                      onChange={(e) => setFormData({...formData, nome_tecnico: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cod_setor" className="text-right">Setor</Label>
                    <select
                      id="cod_setor"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.cod_setor}
                      onChange={(e) => setFormData({...formData, cod_setor: e.target.value})}
                    >
                      <option value="">Selecione um setor</option>
                      {setores.map(setor => (
                        <option key={setor.id_setor} value={setor.id_setor}>
                          {setor.nome_setor}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="datanasc" className="text-right">Nascimento</Label>
                    <Input
                      id="datanasc"
                      type="date"
                      className="col-span-3"
                      value={formData.datanasc}
                      onChange={(e) => setFormData({...formData, datanasc: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valorhora" className="text-right">Valor/Hora *</Label>
                    <Input
                      id="valorhora"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      value={formData.valorhora}
                      onChange={(e) => setFormData({...formData, valorhora: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cpf" className="text-right">CPF</Label>
                    <Input
                      id="cpf"
                      className="col-span-3"
                      value={formData.cpf}
                      onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="telefone" className="text-right">Telefone</Label>
                    <Input
                      id="telefone"
                      className="col-span-3"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full">
                  {editingTecnico ? "Atualizar Técnico" : "Cadastrar Técnico"}
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
                placeholder="Buscar técnicos por nome, CPF ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTecnicos.map((tecnico) => (
              <Card key={tecnico.id_tecnico}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(tecnico)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o técnico {tecnico.nome_tecnico}? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(tecnico.id_tecnico)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tecnico.nome_tecnico}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline">{getSetorNome(tecnico.cod_setor)}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tecnico.datanasc && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{calcularIdade(tecnico.datanasc)} anos</span>
                      </div>
                    )}
                    {tecnico.telefone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{tecnico.telefone}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">Valor/Hora:</span>
                      </div>
                      <span className="font-medium">R$ {tecnico.valorhora?.toFixed(2) || '0.00'}</span>
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

          {filteredTecnicos.length === 0 && !loading && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum técnico encontrado com os critérios de busca.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TecnicosManager;
