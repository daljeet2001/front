import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await register(form);
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-bebas">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl bg-white rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bebas font-bold">Front</CardTitle>
            <p className="text-sm text-gray-500 font-chewy dark:text-gray-400">
              Create your account
            </p>

            {/* Role Switch */}
            <div className="flex justify-center space-x-2 mt-4 font-chewy">
              <Button
                type="button"
                onClick={() => setForm({ ...form, role: "user" })}
                className={`px-4 py-1 rounded-lg ${
                  form.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                User
              </Button>
              <Button
                type="button"
                onClick={() => setForm({ ...form, role: "admin" })}
                className={`px-4 py-1 rounded-lg ${
                  form.role === "admin"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Admin
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2 font-chewy">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Your username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-700 focus-visible:ring-0 rounded-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 font-chewy">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-700 focus-visible:ring-0 rounded-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2 font-chewy">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-700 focus-visible:ring-0 rounded-sm"
                />
              </div>

              {err && (
                <p className="text-red-500 text-sm text-center">{err}</p>
              )}

              <Button
                type="submit"
                className="w-full font-medium rounded-lg font-chewy bg-black text-white hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Signing up...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center justify-center font-chewy">
                <span className="h-px w-full bg-gray-200 dark:bg-gray-700"></span>
                <span className="absolute bg-white px-2 text-sm text-gray-500">
                  OR
                </span>
              </div>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 font-chewy">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

