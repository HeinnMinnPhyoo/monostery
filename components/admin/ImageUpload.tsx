"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/utils";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (!isSupabaseConfigured()) {
      setError("Supabase မပြင်ရသေးပါ။");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("ပုံအရွယ်အစား ၅MB ထက် မကျော်သင့်ပါ။");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const supabase = createBrowserSupabaseClient();
      const safeName = file.name.replace(/[^\w.\-]+/g, "_");
      const path = `${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ပုံတင်၍ မရပါ။");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="cover-picker">
      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={(event) => void onFile(event.target.files?.[0])}
      />
      {busy ? <p className="muted">တင်နေသည်...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {value ? <img src={value} alt="cover preview" /> : null}
    </div>
  );
}
