export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Manufacturing Monitoring
        </h1>
      </div>

      <div className="text-sm text-gray-500">Admin</div>
    </header>
  );
}
