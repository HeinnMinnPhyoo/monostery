import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { getEventByIdForAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventByIdForAdmin(id);
  if (!event) notFound();

  return (
    <>
      <div className="admin-top">
        <h2>ပွဲ ပြင်ဆင်ရန်</h2>
      </div>
      <EventForm event={event} />
    </>
  );
}
