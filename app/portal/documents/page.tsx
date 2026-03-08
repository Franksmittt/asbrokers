import { MOCK_DOCUMENTS } from "@/lib/mock-portal";
import { FileText } from "@/components/icons";
import { DocumentUpload } from "@/components/portal/DocumentUpload";

export const metadata = {
  title: "Document Vault",
  description: "Your secure documents.",
};

export default function PortalDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Document vault</h1>
        <p className="text-zinc-400 text-sm">FICA and quote documents. Upload and view securely.</p>
      </div>

      <DocumentUpload />

      <div className="rounded-2xl rim-light bg-vault-card border border-white/10 overflow-hidden">
        <ul className="divide-y divide-white/5">
          {MOCK_DOCUMENTS.map((doc) => (
            <li
              key={doc.id}
              className="px-4 sm:px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white truncate">{doc.name}</p>
                <p className="text-xs text-zinc-500">{doc.type} · {doc.uploadedAt}</p>
              </div>
              {doc.size && (
                <span className="text-xs text-zinc-500 shrink-0">{doc.size}</span>
              )}
              <button
                type="button"
                disabled
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 text-zinc-500 cursor-not-allowed"
              >
                View (mock)
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
