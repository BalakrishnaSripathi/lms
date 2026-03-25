import { useState } from "react"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// ✅ Zod Schema
const loginSchema = z.object({
  userId: z.string().min(3, "User ID must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function StaffLogin() {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // ✅ handle input + clear error
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  // ✅ submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const result = loginSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors = {}

      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message
      })

      setErrors(fieldErrors)
    } else {
      setErrors({})
      console.log("Form Data:", form)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <Card className="flex flex-col w-[400px] h-[456px] rounded-[14px] border-[2.67px] border-t-[2.67px] border-[#00BBA7] px-[34.67px] pt-[34.67px] pb-[2.67px] gap-6">
        
        {/* Header */}
        <CardHeader className="text-center space-y-2 p-0">
          <div className="flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
              👤
            </div>
          </div>
          <CardTitle>Staff Login</CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-0 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* User ID */}
            <div>
              <Label>User ID / Mobile Number</Label>
              <Input
                name="userId"
                placeholder="Enter your User ID"
                value={form.userId}
                onChange={handleChange}
                className={`${
                  errors.userId ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {errors.userId && (
                <p className="text-red-500 text-sm">{errors.userId}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={`${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!form.userId || !form.password}
            >
              Login
            </Button>

            {/* Forgot Password */}
            <p className="text-sm text-center text-gray-500 hover:underline cursor-pointer">
              Forgot Password?
            </p>

          </form>
        </CardContent>
      </Card>

    </div>
  )
}