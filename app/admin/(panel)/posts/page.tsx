import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <>
      <div className="admin-top">
        <h2>ပို့စ်များ</h2>
        <Link className="btn" href="/admin/posts/new">
          ပို့စ်အသစ်
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="empty-state">ပို့စ် မရှိသေးပါ။</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ခေါင်းစဉ်</th>
              <th>အခြေအနေ</th>
              <th>ပြင်ဆင်ချိန်</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  {post.title_my}
                  {post.status === "published" ? (
                    <>
                      <br />
                      <a href={`/posts/${post.slug}`} target="_blank" rel="noreferrer">
                        public မှာကြည့်ရန်
                      </a>
                    </>
                  ) : null}
                </td>
                <td>
                  <span className={`badge ${post.status}`}>{post.status}</span>
                </td>
                <td>{new Date(post.updated_at).toLocaleString()}</td>
                <td>
                  <Link className="btn small" href={`/admin/posts/${post.id}`}>
                    ပြင်မည်
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
