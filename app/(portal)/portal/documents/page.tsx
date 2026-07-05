import { FileText } from "@/components/icons";
import { DocumentUpload } from "@/components/portal/DocumentUpload";
import { documents } from "@/lib/mock-portal";

export const metadata = {
  title: "Documents",
  description: "Secure document vault for AS Brokers clients.",
};

function formatDocDate(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export default function PortalDocumentsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white">Documents</h1>
        <p className="mt-2 text-sm text-white/50">
          Statements, advice records, and policy schedules. Prototype vault.
        </p>
      </header>

      <DocumentUpload />

      <ul className="mt-8 space-y-3">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="rim-light flex items-start gap-4 rounded-[2rem] p-4 sm:p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-shark">
              <FileText className="h-5 w-5 text-cinematic-teal" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">{doc.title}</p>
              <p className="mt-1 text-xs text-white/50">
                {doc.category} · {formatDocDate(doc.uploadedAt)} · {doc.sizeKb} KB
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 text-xs font-semibold text-samsung-blue hover:text-white"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
