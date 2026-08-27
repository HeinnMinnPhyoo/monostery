import { deleteMedia, listMedia } from "@/lib/actions/media";
import { MediaUploader } from "@/components/admin/MediaUploader";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const { files, error } = await listMedia();

  return (
    <>
      <div className="admin-top">
        <h2>ပုံများ</h2>
      </div>
      <MediaUploader />
      {error ? <p className="error">{error}</p> : null}
      {files.length === 0 ? (
        <p className="empty-state">ပုံ မရှိသေးပါ။</p>
      ) : (
        <div className="media-grid">
          {files.map((file) => (
            <article key={file.name} className="media-item">
              <img src={file.url} alt={file.name} />
              <div className="media-meta">
                <p className="muted">{file.name}</p>
                <form action={deleteMedia}>
                  <input type="hidden" name="name" value={file.name} />
                  <button className="btn danger small" type="submit">
                    ဖျက်မည်
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
