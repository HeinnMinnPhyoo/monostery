"use client";

import { useState } from "react";
import { deleteEvent, saveEvent } from "@/lib/actions/events";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toDatetimeLocal } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

export function EventForm({ event }: { event?: EventItem }) {
  const [coverUrl, setCoverUrl] = useState(event?.cover_url ?? "");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    formData.set("cover_url", coverUrl);
    const result = await saveEvent(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form className="card form-grid" action={onSubmit}>
      {event ? <input type="hidden" name="id" value={event.id} /> : null}
      <div className="form-row">
        <label className="field">
          ခေါင်းစဉ် (မြန်မာ)
          <input name="title_my" required defaultValue={event?.title_my} />
        </label>
        <label className="field">
          Title (English)
          <input name="title_en" defaultValue={event?.title_en} />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          စတင်မည့်အချိန်
          <input
            type="datetime-local"
            name="starts_at"
            required
            defaultValue={toDatetimeLocal(event?.starts_at)}
          />
        </label>
        <label className="field">
          ပြီးဆုံးမည့်အချိန်
          <input type="datetime-local" name="ends_at" defaultValue={toDatetimeLocal(event?.ends_at)} />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          နေရာ (မြန်မာ)
          <input name="location_my" defaultValue={event?.location_my} />
        </label>
        <label className="field">
          Location (English)
          <input name="location_en" defaultValue={event?.location_en} />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          ဖော်ပြချက် (မြန်မာ)
          <textarea name="description_my" defaultValue={event?.description_my} />
        </label>
        <label className="field">
          Description (English)
          <textarea name="description_en" defaultValue={event?.description_en} />
        </label>
      </div>
      <label className="field">
        ကာဗာပုံ
        <ImageUpload value={coverUrl} onChange={setCoverUrl} />
      </label>
      <label className="field">
        အခြေအနေ
        <select name="status" defaultValue={event?.status ?? "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="form-actions">
        <button className="btn" type="submit">
          သိမ်းမည်
        </button>
        {event ? (
          <button
            className="btn danger"
            type="submit"
            formAction={async (formData) => {
              formData.set("id", event.id);
              const result = await deleteEvent(formData);
              if (result?.error) setError(result.error);
            }}
          >
            ဖျက်မည်
          </button>
        ) : null}
      </div>
    </form>
  );
}
