"use client";

import { useState } from "react";
import { addAdmin, removeAdmin, updateAdminRole } from "@/lib/actions/users";
import type { Profile } from "@/lib/types";

export function UsersManager({
  profiles,
  currentId
}: {
  profiles: Profile[];
  currentId: string;
}) {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onAdd(formData: FormData) {
    setError("");
    setMessage("");
    setPassword("");
    const result = await addAdmin(formData);
    if (result && "error" in result && result.error) {
      setError(result.error);
      return;
    }
    if (result && "ok" in result) {
      setMessage(result.message ?? "");
      if (result.password) setPassword(result.password);
    }
  }

  return (
    <div className="form-grid">
      <form className="card form-grid" action={onAdd}>
        <h3>Admin အသစ် ထည့်မည်</h3>
        <div className="form-row">
          <label className="field">
            အီးမေးလ်
            <input type="email" name="email" required />
          </label>
          <label className="field">
            အခန်းကဏ္ဍ
            <select name="role" defaultValue="editor">
              <option value="editor">editor — ပို့စ်/ပွဲသာ</option>
              <option value="superadmin">superadmin — admin ထပ်ထည့်နိုင်</option>
            </select>
          </label>
        </div>
        <button className="btn" type="submit">
          ထည့်မည်
        </button>
        {error ? <p className="error">{error}</p> : null}
        {message ? <p className="notice">{message}</p> : null}
        {password ? (
          <p className="notice">
            ယာယီစကားဝှက်: <code>{password}</code>
          </p>
        ) : null}
      </form>

      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>အီးမေးလ်</th>
              <th>အခန်းကဏ္ဍ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.email}</td>
                <td>
                  <form action={updateAdminRole}>
                    <input type="hidden" name="id" value={profile.id} />
                    <select
                      name="role"
                      defaultValue={profile.role}
                      disabled={profile.id === currentId}
                      onChange={(event) => event.currentTarget.form?.requestSubmit()}
                    >
                      <option value="editor">editor</option>
                      <option value="superadmin">superadmin</option>
                    </select>
                  </form>
                </td>
                <td>
                  {profile.id === currentId ? (
                    <span className="muted">သင်</span>
                  ) : (
                    <form action={removeAdmin}>
                      <input type="hidden" name="id" value={profile.id} />
                      <button className="btn danger small" type="submit">
                        ဖယ်မည်
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
