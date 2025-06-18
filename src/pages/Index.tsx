
import TecnicosManager from "@/components/TecnicosManager";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Sistema de Manutenção - Gestão de Técnicos</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <TecnicosManager />
      </div>
    </div>
  );
};

export default Index;
