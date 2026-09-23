"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import "./admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const path = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setEmail(data.user?.email || ""))
      .catch(() => setEmail(""));
  }, []);

  return (
    <div className="admin">
      <div className={open ? "admin__overlay is-open" : "admin__overlay"} onClick={() => setOpen(false)} />
      <div className="admin__shell">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="admin__main">
          <Topbar email={email} onMenu={() => setOpen(true)} />
          <div className="admin__content">{children}</div>
        </div>
      </div>
    </div>
  );
}
