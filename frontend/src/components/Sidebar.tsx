import { LayoutDashboard } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Sidebar() {
  return (
    <aside className="h-[calc(100vh-4rem)] w-64 border-r bg-gray-50 p-4">
      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex gap-2 rounded-md px-4 py-2 text-left hover:bg-gray-200 cursor-pointer"
          activeProps={{
            className:
              "flex gap-2 rounded-md px-4 py-2 text-left bg-gray-200 font-semibold",
          }}
        >
          <LayoutDashboard size={24} strokeWidth={2} />
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
