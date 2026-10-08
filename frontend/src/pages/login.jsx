import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import api from "../lib/apis.jsx";

export default function Login() {

  const navigate = useNavigate();

  const [mode, setMode] =
    useState("login");

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const updateField = (field, value) => {

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  };

  const submit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const endpoint =
        mode === "login"
          ? "/auth/login"
          : "/auth/register";

      const response =
        await api.post(
          endpoint,
          form
        );

      localStorage.setItem(
        "vyora_token",
        response.data.token
      );

      localStorage.setItem(
        "vyora_user",
        JSON.stringify(
          response.data.user
        )
      );

      navigate("/");

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">

      <div className="auth-image">

        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85"
          alt="VYORA fashion"
        />

        <div>
          <span>VYORA</span>
          <h2>
            Dress like
            <br />
            yourself.
          </h2>
        </div>

      </div>

      <div className="auth-container">

        <Link
          to="/"
          className="auth-logo"
        >
          VYORA
        </Link>

        <h1>
          {mode === "login"
            ? "Welcome back"
            : "Create your account"}
        </h1>

        <p>
          {mode === "login"
            ? "Login to access your profile, wishlist and orders."
            : "Join VYORA and make every look yours."}
        </p>

        <form onSubmit={submit}>

          {mode === "register" && (
            <label>
              Full name

              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                required
              />
            </label>
          )}

          <label>
            Email

            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                updateField(
                  "password",
                  e.target.value
                )
              }
              minLength={6}
              required
            />
          </label>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "PLEASE WAIT..."
              : mode === "login"
              ? "LOGIN"
              : "CREATE ACCOUNT"}

            {!loading && (
              <ArrowRight size={18} />
            )}
          </button>

        </form>

        <button
          className="auth-switch"
          onClick={() =>
            setMode(
              mode === "login"
                ? "register"
                : "login"
            )
          }
        >
          {mode === "login"
            ? "New to VYORA? Create an account"
            : "Already have an account? Login"}
        </button>

      </div>

    </section>
  );
}