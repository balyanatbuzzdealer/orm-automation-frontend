"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "../store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const makeTrue = useAppStore((state) => state.makeTrue);
  const loggedIn = useAppStore((state) => state.loggedIn);

  const prod_url =
    "https://orm-automation-tool-0494f308f710.herokuapp.com/login";
  const dev_url = "http://127.0.0.1:8000/login";

  const BACKEND_URL = dev_url;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", String(email));
    formData.append("password", String(password));

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.login === "authenticated") {
        makeTrue();
        router.push("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="login-form-wrapper">
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
