import Link from "next/link";

import { ImportForm } from "@/components/ImportForm";

export default function ImportPage() {
  return (
    <>
      <p>
        <Link href="/leads">Back to leads</Link>
      </p>
      <h1>Import CSV</h1>
      <p>Upload the leads CSV file.</p>
      <ImportForm />
    </>
  );
}
