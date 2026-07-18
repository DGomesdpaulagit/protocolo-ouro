"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Pencil, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DisplayNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { display_name: trimmed } });
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="flex items-center gap-1.5 text-xs text-muted transition hover:text-foreground"
      >
        <Pencil size={12} />
        Editar nome
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        autoFocus
        className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none transition focus:border-gold"
      />
      <button
        onClick={handleSave}
        disabled={saving || !name.trim()}
        className="text-gold transition hover:text-gold-light disabled:opacity-50"
        aria-label="Salvar nome"
      >
        <Check size={16} />
      </button>
      <button
        onClick={() => {
          setName(initialName);
          setEditing(false);
        }}
        className="text-muted transition hover:text-foreground"
        aria-label="Cancelar"
      >
        <X size={16} />
      </button>
    </div>
  );
}
