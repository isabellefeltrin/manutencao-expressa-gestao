
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, Wrench, Package, Users, AlertTriangle, TrendingUp } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import AgendamentosList from "@/components/AgendamentosList";
import EstoqueManager from "@/components/EstoqueManager";
import TecnicosManager from "@/components/TecnicosManager";
import MaquinasManager from "@/components/MaquinasManager";
import SetoresManager from "@/components/SetoresManager";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Sistema de Manutenção Industrial</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="agendamentos" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="estoque" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Estoque
            </TabsTrigger>
            <TabsTrigger value="tecnicos" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Técnicos
            </TabsTrigger>
            <TabsTrigger value="maquinas" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Máquinas
            </TabsTrigger>
            <TabsTrigger value="setores" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Setores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="agendamentos" className="mt-6">
            <AgendamentosList />
          </TabsContent>

          <TabsContent value="estoque" className="mt-6">
            <EstoqueManager />
          </TabsContent>

          <TabsContent value="tecnicos" className="mt-6">
            <TecnicosManager />
          </TabsContent>

          <TabsContent value="maquinas" className="mt-6">
            <MaquinasManager />
          </TabsContent>

          <TabsContent value="setores" className="mt-6">
            <SetoresManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
