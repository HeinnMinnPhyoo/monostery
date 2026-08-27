"use client";

import { useState } from "react";
import { deletePost, savePost } from "@/lib/actions/posts";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Post } from "@/lib/types";

export function PostForm({ post }: { post?: Post }) {
  const [coverUrl, setCoverUrl] = useState(post?.cover_url ?? "");
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setError("");
    formData.set("cover_url", coverUrl);
    const result = await savePost(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form className="card form-grid" action={onSubmit}>
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="form-row">
        <label className="field">
          ခေါင်းစဉ် (မြန်မာ)
          <input name="title_my" required defaultValue={post?.title_my} />
        </label>
        <label className="field">
          Title (English)
          <input name="title_en" defaultValue={post?.title_en} />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          အကြောင်းအရာ (မြန်မာ)
          <textarea name="body_my" defaultValue={post?.body_my} />
        </label>
        <label className="field">
          Body (English)
          <textarea name="body_en" defaultValue={post?.body_en} />
        </label>
      </div>
      <label className="field">
        ကာဗာပုံ
        <ImageUpload value={coverUrl} onChange={setCoverUrl} />
        <input type="hidden" name="cover_url" value={coverUrl} />
      </label>
      <label className="field">
        အခြေအနေ
        <select name="status" defaultValue={post?.status ?? "draft"}>
          <option value="draft">Draft — မသိမ်းချင်သေး / မပေါ်သေး</option>
          <option value="published">Published — public site မှာ ချက်ချင်းပေါ်</option>
        </select>
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="form-actions">
        <button className="btn" type="submit">
          သိမ်းမည်
        </button>
        {post ? (
          <button
            className="btn danger"
            type="submit"
            formAction={async (formData) => {
              formData.set("id", post.id);
              const result = await deletePost(formData);
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
