"use client";

import { useState } from "react";

type PositionContent = {
  position: string;
  section: string;
  order_in_position: number;
  content: string;
};

const POSITION_LABEL: Record<string, string> = {
  volante: "Volante",
  lateral: "Lateral",
  meia: "Meia",
  zagueiro_libero: "Zagueiro / Líbero",
};

const SECTION_LABEL: Record<string, string> = {
  funcao_tatica: "Função tática",
  fundamentos_tecnicos: "Fundamentos técnicos",
  erros_comuns: "Erros comuns e correção",
  treino: "Exercícios de treino",
  mentalidade: "Aspectos mentais da posição",
};

export function PositionsView({ rows }: { rows: PositionContent[] }) {
  const positions = ["volante", "lateral", "meia", "zagueiro_libero"];
  const [active, setActive] = useState(positions[0]);

  const activeRows = rows
    .filter((r) => r.position === active)
    .sort((a, b) => a.order_in_position - b.order_in_position);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setActive(pos)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
              active === pos
                ? "border-gold bg-gold text-black font-semibold"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {POSITION_LABEL[pos]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {activeRows.map((row) => (
          <div
            key={row.section}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold">
              {SECTION_LABEL[row.section] ?? row.section}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {row.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
