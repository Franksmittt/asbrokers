"use client";

import type { CrmTask } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

export function CrmTasksClient({ tasks }: { tasks: CrmTask[] }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#1D1D1F]">Tasks</h1>
        <p className="mt-2 text-sm text-[#52525b]">To-do items for your pipeline</p>
      </header>
      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <li className="text-sm text-[#71717a]">No open tasks.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={cn(
                "flex items-start gap-4 rounded-[2rem] p-5",
                task.completed ? "bg-white/50 opacity-60" : "rim-light"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 rounded-md border",
                  task.completed
                    ? "border-cinematic-teal bg-cinematic-teal/30"
                    : "border-[#D4D4D4]"
                )}
                aria-hidden
              />
              <div>
                <p className={cn("font-medium text-[#1D1D1F]", task.completed && "line-through")}>
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-[#71717a]">Due {task.dueDate}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
