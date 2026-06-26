"use client";

import type { CrmTask } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

export function CrmTasksClient({ tasks }: { tasks: CrmTask[] }) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Tasks</h1>
        <p className="mt-2 text-sm text-gray-100">To-do items for your pipeline</p>
      </header>
      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <li className="text-sm text-gray-400">No open tasks.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={cn(
                "flex items-start gap-4 rounded-[2rem] p-5",
                task.completed ? "bg-shark/50 opacity-60" : "rim-light"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 rounded-md border",
                  task.completed
                    ? "border-cinematic-teal bg-cinematic-teal/30"
                    : "border-white/20"
                )}
                aria-hidden
              />
              <div>
                <p className={cn("font-medium text-white", task.completed && "line-through")}>
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-gray-400">Due {task.dueDate}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
