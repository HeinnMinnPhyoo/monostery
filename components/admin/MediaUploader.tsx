"use client";

import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";

export function MediaUploader() {
  const router = useRouter();

  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <h3>ပုံအသစ် တင်မည်</h3>
      <ImageUpload
        value=""
        onChange={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
