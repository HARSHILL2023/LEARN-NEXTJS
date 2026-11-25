
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await res.json();

            setSuccess(res.ok);
            setMessage(data.message || "Something went wrong");

            if (res.ok) {
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch {
            setSuccess(false);
            setMessage("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#18181b] p-8 shadow-2xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Register to get started
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full rounded-lg border border-white/10 bg-[#09090b] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
                        />
                    </div>

                    {message && (
                        <div className={`rounded-lg p-3 text-sm ${
                            success
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                        }`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
