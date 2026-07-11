"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

export function DocumentUpload() {
  const reduceMotion = useReducedMotion();
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  return (
    <motion.label
      htmlFor="portal-doc-upload"
      className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-shark/60 px-6 py-12 text-center"
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      data-drag-over={dragOver || undefined}
    >
      <input
        id="portal-doc-upload"
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        className="sr-only"
        onChange={() => {
          /* prototype, no upload wiring */
        }}
      />
      <span className="mb-2 text-sm font-semibold text-white">Upload a document</span>
      <span className="max-w-xs text-xs text-white/50">
        Drag and drop PDFs here, or click to browse. Prototype only; files are not stored.
      </span>
    </motion.label>
  );
}
