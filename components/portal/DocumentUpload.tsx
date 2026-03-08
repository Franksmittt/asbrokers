"use client";

import { useState, useRef } from "react";
import { FileText } from "@/components/icons";

interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export function DocumentUpload() {
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploads((prev) => [
        ...prev,
        {
          id: `upload-${Date.now()}`,
          name: file.name,
          type: "Uploaded (mock)",
          uploadedAt: new Date().toISOString().slice(0, 10),
        },
      ]);
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }, 600);
  }

  return (
    <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Upload document</h2>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFile}
          className="hidden"
          id="doc-upload"
        />
        <label
          htmlFor="doc-upload"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
            uploading ? "bg-white/5 text-zinc-500 cursor-wait" : "bg-cinematic-teal/20 text-cinematic-teal hover:bg-cinematic-teal/30"
          }`}
        >
          {uploading ? "Uploading…" : "Choose file"}
        </label>
      </div>
      {uploads.length > 0 && (
        <ul className="divide-y divide-white/5">
          {uploads.map((doc) => (
            <li key={doc.id} className="px-4 sm:px-6 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white truncate">{doc.name}</p>
                <p className="text-xs text-zinc-500">{doc.type} · {doc.uploadedAt}</p>
              </div>
              <span className="text-xs text-green-400">Uploaded (mock)</span>
            </li>
          ))}
        </ul>
      )}
      <p className="px-4 sm:px-6 py-3 text-xs text-zinc-500 border-t border-white/5">
        Mock upload: file is not stored. Backend will use Supabase Storage + FICA audit trail.
      </p>
    </div>
  );
}
