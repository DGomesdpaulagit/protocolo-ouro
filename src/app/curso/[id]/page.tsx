import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { withStatus } from "@/lib/lessons";
import { Nav } from "@/components/nav";
import { MarkdownLite } from "@/components/markdown-lite";
import { CompleteLessonButton } from "@/components/complete-lesson-button";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lessonId = Number(id);
  if (!Number.isInteger(lessonId)) {
    notFound();
  }

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

  if (!lessons) notFound();

  const completedIds = new Set((progress ?? []).map((p) => p.lesson_id));
  const withStatuses = withStatus(lessons, completedIds);
  const lesson = withStatuses.find((l) => l.id === lessonId);

  if (!lesson) notFound();
  if (lesson.status === "locked") {
    redirect("/curso");
  }

  const nextLesson = withStatuses.find((l) => l.id === lessonId + 1);

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
        <div>
          <Link href="/curso" className="text-sm text-muted hover:text-foreground">
            ← Voltar ao curso
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-gold-light">
            {lesson.title}
          </h1>
        </div>

        <MarkdownLite content={lesson.content} />

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-gold">
            Exercício
          </p>
          <p className="text-sm">{lesson.exercise_prompt}</p>
        </div>

        <CompleteLessonButton
          lessonId={lesson.id}
          nextLessonId={nextLesson?.id ?? null}
          alreadyCompleted={lesson.status === "completed"}
        />
      </main>
    </div>
  );
}
