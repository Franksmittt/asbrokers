"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

type PersistFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  className?: string;
  children: ReactNode;
  formKey?: string;
};

/** Keep typed values after a Server Action so the form does not snap back to the last render. */
export function StudioPersistForm({ action, className, children, formKey }: PersistFormProps) {
  return (
    <form
      key={formKey}
      action={action}
      className={className}
      onReset={(event) => event.preventDefault()}
    >
      {children}
    </form>
  );
}

export function StudioSelect({
  name,
  value,
  className,
  children,
}: {
  name: string;
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <select
      name={name}
      value={current}
      onChange={(event) => setCurrent(event.target.value)}
      className={className}
    >
      {children}
    </select>
  );
}

export function StudioSaveButton({
  idleLabel,
  className,
}: {
  idleLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? "Saving…" : idleLabel}
    </button>
  );
}
