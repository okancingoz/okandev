/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { authService } from "@/services/auth.service";
import { ICredentials } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialState: ICredentials = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [credentials, setCredentials] = useState<ICredentials>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.loginUser(credentials);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
