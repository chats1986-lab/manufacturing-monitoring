import Layout from "@/components/Layout";
import PrinterCard from "@/components/PrinterCard";
import { useFactories } from "@/hooks/useFactories";

export default function Dashboard() {
  const { data, isLoading, error } = useFactories();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading factories</h1>;
  }

  return (
    <Layout>
      <div className="space-y-10">
        {data.data.map((factory: any) => (
          <section key={factory.id}>
            <h2 className="text-2xl font-bold">{factory.name}</h2>

            <p className="text-gray-600">Location: {factory.location}</p>

            <div className="grid grid-cols-3 gap-5 mt-5">
              {factory.printers.map((printer: any) => (
                <PrinterCard key={printer.id} printer={printer} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
