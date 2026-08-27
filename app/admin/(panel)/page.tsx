import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAllEventsForAdmin, getAllPostsForAdmin, splitEvents } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { profile } = await requireAdmin();
  const [posts, events] = await Promise.all([getAllPostsForAdmin(), getAllEventsForAdmin()]);
  const drafts = posts.filter((post) => post.status === "draft").length;
  const published = posts.filter((post) => post.status === "published").length;
  const { upcoming } = splitEvents(events.filter((event) => event.status === "published"));
  const recent = posts.slice(0, 5);

  return (
    <>
      <div className="admin-top">
        <div>
          <h2>Dashboard</h2>
          <p className="muted">မင်္ဂလာပါ၊ {profile.email}</p>
        </div>
        <div className="form-actions">
          <Link className="btn" href="/admin/posts/new">
            ပို့စ်အသစ်
          </Link>
          <Link className="btn secondary" href="/admin/events/new">
            ပွဲအသစ်
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <article className="card">
          <p className="muted">Draft ပို့စ်</p>
          <h2>{drafts}</h2>
        </article>
        <article className="card">
          <p className="muted">Published ပို့စ်</p>
          <h2>{published}</h2>
        </article>
        <article className="card">
          <p className="muted">လာမည့်ပွဲ</p>
          <h2>{upcoming.length}</h2>
        </article>
      </div>

      <section className="section">
        <h3>နောက်ဆုံး ပြင်ထားသော ပို့စ်များ</h3>
        {recent.length === 0 ? (
          <p className="empty-state">ပို့စ် မရှိသေးပါ။</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ခေါင်းစဉ်</th>
                <th>အခြေအနေ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((post) => (
                <tr key={post.id}>
                  <td>{post.title_my}</td>
                  <td>
                    <span className={`badge ${post.status}`}>{post.status}</span>
                  </td>
                  <td>
                    <Link href={`/admin/posts/${post.id}`}>ပြင်မည်</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
