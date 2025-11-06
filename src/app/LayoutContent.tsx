'use client';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <main>{children}</main>
    </div>
  );
}
