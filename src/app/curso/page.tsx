import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { withStatus, groupByBlock } from "@/lib/lessons";
import { Nav } from "@/components/nav";

const STATUS_LABEL: Record<string, string> = {
  locked: "Bloqueada",
  available: "Disponível",
  completed: "Concluída",
};

export default async function CursoPage() {
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
  const blocks = groupByBlock(withStatus(lessons ?? [], completedIds));

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-8">
        <h1 className="text-2xl font-semibold">Curso</h1>

        {blocks.map(({ block, name, lessons }) => (
          <section key={block} className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">
              Bloco {block} — {name}
            </h2>
            <div className="flex flex-col gap-2">
              {lessons.map((lesson) => {
                const isLocked = lesson.status === "locked";
                const card = (
                  <div
                    className={`flex items-center justify-between rounded-lg border p-3 ${
                      isLocked
                        ? "border-border opacity-50"
                        : "border-border bg-surface hover:border-gold"
                    }`}
                  >
                    <span className="text-sm">{lesson.title}</span>
                    <span
                      className={`text-xs ${
                        lesson.status === "completed"
                          ? "text-gold-light"
                          : "text-muted"
                      }`}
                    >
                      {STATUS_LABEL[lesson.status]}
                    </span>
                  </div>
                );
                return isLocked ? (
                  <div key={lesson.id}>{card}</div>
                ) : (
                  <Link key={lesson.id} href={`/curso/${lesson.id}`}>
                    {card}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
