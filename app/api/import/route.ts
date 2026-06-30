import { importLeadsFromCsv } from "@/services/importService";

export async function POST(request: Request) {
  try {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return Response.json({ error: "file field required" }, { status: 400 });
    }

    const file = form.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "file field required" }, { status: 400 });
    }

    const result = await importLeadsFromCsv(await file.text());
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.error("[POST /api/import]", error);
    return Response.json({ error: "Import failed" }, { status: 500 });
  }
}
