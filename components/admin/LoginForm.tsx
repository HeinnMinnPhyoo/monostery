"use client";

import { useState } from "react";
import { loginAdmin } from "@/lib/actions/auth";

export function LoginForm({ nextPath, configured }: { nextPath: string; configured: boolean }) {
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    const result = await loginAdmin(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form className="form-grid" action={onSubmit}>
      <input type="hidden" name="next" value={nextPath} />
      <label className="field">
        အီးမေးလ်
        <input type="email" name="email" required autoComplete="username" />
      </label>
      <label className="field">
        စကားဝှက်
        <input type="password" name="password" required autoComplete="current-password" />
      </label>
      {!configured ? (
        <p className="error">.env.local တွင် Supabase URL နှင့် keys ထည့်ပြီး SQL migration ကို run ပါ။</p>
      ) : null}
      {error ? <p className="error">{error}</p> : null}
      <button className="btn" type="submit" disabled={!configured}>
        ဝင်ရောက်မည်
      </button>
    </form>
  );
}
