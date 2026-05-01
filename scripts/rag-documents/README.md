# RAG documents

Place **.txt** or **.md** files here for the AI chatbot’s RAG pipeline.

- Everest Wealth brochures, FAIS compliance text, SARS guidelines, etc.
- For PDFs: copy the text into a .txt file, or export “Save as Text” from your PDF viewer.

Then from the project root run:

```bash
npm run rag:ingest
```

Or with a custom folder:

```bash
npx tsx scripts/ingest-rag.ts path/to/your/documents
```

Requires `DATABASE_URL` and `OPENAI_API_KEY` in `.env.local`.
