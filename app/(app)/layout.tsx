import AppHeader from '@/component/AppHeader';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main>
        {children}
      </main>
    </div>
  );
}