export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" min-h-screen">
      <div className="px-1 sm:px-10">{children}</div>
    </main>
  );
}
