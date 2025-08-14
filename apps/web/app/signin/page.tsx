"use client";
import { signin } from "@/actions/user"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Sign in data:", form)
    const response = await signin(form)

    if(response) {
      localStorage.setItem('token', response)
      router.push('../admin')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back Admin👋
        </h2>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sign in button */}
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
