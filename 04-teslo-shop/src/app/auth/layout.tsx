export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center min-h-screen">
      <div className="w-full sm:w-[600px]">{children}</div>
    </main>
  );
}
