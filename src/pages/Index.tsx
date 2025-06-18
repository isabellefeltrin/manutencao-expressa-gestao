
import ExecucoesView from "@/components/ExecucoesView";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Sistema de Manutenção - Execuções do Mês</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <ExecucoesView />
      </div>
    </div>
  );
};

export default Index;
