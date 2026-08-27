import Link from "next/link";
import { getAllEventsForAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await getAllEventsForAdmin();

  return (
    <>
      <div className="admin-top">
        <h2>ပွဲတော်များ</h2>
        <Link className="btn" href="/admin/events/new">
          ပွဲအသစ်
        </Link>
      </div>
      {events.length === 0 ? (
        <p className="empty-state">ပွဲ မရှိသေးပါ။</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ခေါင်းစဉ်</th>
              <th>ရက်စွဲ</th>
              <th>အခြေအနေ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>
                  {event.title_my}
                  {event.status === "published" ? (
                    <>
                      <br />
                      <a href={`/events/${event.id}`} target="_blank" rel="noreferrer">
                        public မှာကြည့်ရန်
                      </a>
                    </>
                  ) : null}
                </td>
                <td>{new Date(event.starts_at).toLocaleString()}</td>
                <td>
                  <span className={`badge ${event.status}`}>{event.status}</span>
                </td>
                <td>
                  <Link className="btn small" href={`/admin/events/${event.id}`}>
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
