"use client";

export function BackgroundOrbs() {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" aria-hidden />
      <div className="absolute top-[30%] right-[-10%] w-[30%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" aria-hidden />
    </>
  );
}
