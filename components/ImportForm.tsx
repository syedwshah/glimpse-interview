"use client";

import { useState } from "react";

export function ImportForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/import", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });

    const json = await res.json();
    if (!res.ok) {
      setMessage(json.error ?? "Import failed");
      return;
    }

    setMessage(`Imported ${json.imported}, skipped ${json.skipped}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="file" accept=".csv" required />
      <button type="submit">Upload</button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
