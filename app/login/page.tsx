"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "../admin/admin.css";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!data.success) {
      setError(data.message || "Login failed");
      return;
    }
    router.push(params.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="login">
      <form className="login__card" onSubmit={onSubmit}>
        <p className="login__kicker">13th Pencil</p>
        <h1 className="login__title">Log in to the studio.</h1>
        {error ? <div className="login__error">{error}</div> : null}
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="login__input"
          type="email"
          name="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="login__input"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__btn" type="submit" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
