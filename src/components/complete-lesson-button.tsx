"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markLessonCompleted } from "@/app/curso/[id]/actions";

export function CompleteLessonButton({
  lessonId,
  nextLessonId,
  alreadyCompleted,
}: {
  lessonId: number;
  nextLessonId: number | null;
  alreadyCompleted: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(alreadyCompleted);

  function handleClick() {
    startTransition(async () => {
      await markLessonCompleted(lessonId);
      setDone(true);
      router.refresh();
    });
  }

  if (done) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gold-light">Lição concluída.</p>
        {nextLessonId && (
          <button
            onClick={() => router.push(`/curso/${nextLessonId}`)}
            className="rounded bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-light"
          >
            Próxima lição
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-light disabled:opacity-50"
    >
      {isPending ? "Salvando..." : "Marcar como concluída"}
    </button>
  );
}
