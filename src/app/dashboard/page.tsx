import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { withStatus } from "@/lib/lessons";
import { Nav } from "@/components/nav";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: lessons }, { data: progress }] = await Promise.all([
    supabase.from("lessons").select("*"),
    supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user!.id),
  ]);

  const completedIds = new Set((progress ?? []).map((p) => p.lesson_id));
  const withStatuses = withStatus(lessons ?? [], completedIds);
  const total = withStatuses.length;
  const completedCount = withStatuses.filter(
    (l) => l.status === "completed",
  ).length;
  const nextLesson = withStatuses.find((l) => l.status === "available");
  const progressPct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
        <div>
          <h1 className="text-2xl font-semibold">
            {completedCount === 0
              ? "Bem-vindo ao Protocolo Ouro"
              : "Bora continuar"}
          </h1>
          <p className="text-sm text-muted">
            {completedCount} de {total} lições concluídas
          </p>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {nextLesson ? (
          <Link
            href={`/curso/${nextLesson.id}`}
            className="rounded-lg border border-gold bg-surface p-4 transition hover:border-gold-light"
          >
            <p className="text-xs uppercase tracking-wide text-muted">
              Próxima lição
            </p>
            <p className="mt-1 font-medium text-gold-light">
              {nextLesson.title}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg border border-gold bg-surface p-4">
            <p className="font-medium text-gold-light">
              Você concluiu todas as lições. Parabéns.
            </p>
          </div>
        )}

        <Link
          href="/curso"
          className="rounded-lg border border-border bg-surface p-4 transition hover:border-gold"
        >
          <p className="font-medium">Ver curso completo</p>
          <p className="text-sm text-muted">20 lições em 4 blocos</p>
        </Link>

        <Link
          href="/posicoes"
          className="rounded-lg border border-border bg-surface p-4 transition hover:border-gold"
        >
          <p className="font-medium">Posições</p>
          <p className="text-sm text-muted">
            Consulta rápida por posição, a qualquer momento
          </p>
        </Link>
      </main>
    </div>
  );
}
