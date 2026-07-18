import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/nav";
import { PositionsView } from "@/components/positions-view";

export default async function PosicoesPage() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("positions_content")
    .select("position, section, order_in_position, content")
    .neq("position", "geral");

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
        <div>
          <h1 className="text-2xl font-semibold">Posições</h1>
          <p className="text-sm text-muted">
            Consulta rápida, disponível a qualquer momento — antes ou depois
            do treino.
          </p>
        </div>

        <PositionsView rows={rows ?? []} />
      </main>
    </div>
  );
}
