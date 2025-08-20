/* Note: I created this Login Form with the help of AI to speed up the development process, 
   since my laptop was not available and I couldn’t code as easily. For this assignment, 
   I chose this approach to save time. However, I want to assure you sir that I already 
   know how to build this from scratch, as I have developed several web applications 
   in the past. I also modified parts of the generated code to match my own design preferences. */


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Moon, Sun, AlertCircle, CheckCircle2 } from "lucide-react"

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

interface FormTouched {
  email: boolean
  password: boolean
}

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<FormTouched>({ email: false, password: false })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  // Real-time validation
  const validateEmail = (value: string): string | undefined => {
    if (!value) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password is required"
    if (value.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "Password must contain uppercase, lowercase, and number"
    }
    return undefined
  }

  // Handle field changes with real-time validation
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (touched.email) {
      const error = validateEmail(value)
      setErrors((prev) => ({ ...prev, email: error, general: undefined }))
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (touched.password) {
      const error = validatePassword(value)
      setErrors((prev) => ({ ...prev, password: error, general: undefined }))
    }
  }

  // Handle field blur (mark as touched)
  const handleBlur = (field: keyof FormTouched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    if (field === "email") {
      const error = validateEmail(email)
      setErrors((prev) => ({ ...prev, email: error }))
    } else if (field === "password") {
      const error = validatePassword(password)
      setErrors((prev) => ({ ...prev, password: error }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ email: true, password: true })

    // Validate all fields
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    const newErrors: FormErrors = {
      email: emailError,
      password: passwordError,
    }

    setErrors(newErrors)

    // If no errors, proceed with submission
    if (!emailError && !passwordError) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulate random success/failure for demo
        if (Math.random() > 0.3) {
          setIsSuccess(true)
          setErrors({})
        } else {
          setErrors({ general: "Invalid email or password. Please try again." })
        }
      } catch (error) {
        setErrors({ general: "Something went wrong. Please try again later." })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const isFormValid = !errors.email && !errors.password && email && password

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      <Card className="w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Welcome Back</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Message */}
          {isSuccess && (
            <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                Login successful! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {/* General Error */}
          {errors.general && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Enter your email"
                className={`transition-colors ${
                  errors.email && touched.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                aria-invalid={errors.email && touched.email ? "true" : "false"}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                disabled={isLoading || isSuccess}
                autoComplete="email"
                required
              />
              {errors.email && touched.email && (
                <p id="email-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  className={`pr-10 transition-colors ${
                    errors.password && touched.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  aria-invalid={errors.password && touched.password ? "true" : "false"}
                  aria-describedby={errors.password && touched.password ? "password-error" : "password-help"}
                  disabled={isLoading || isSuccess}
                  autoComplete="current-password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading || isSuccess}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>

              {!touched.password && (
                <p id="password-help" className="text-xs text-slate-500 dark:text-slate-400">
                  Must be 8+ characters with uppercase, lowercase, and number
                </p>
              )}

              {errors.password && touched.password && (
                <p id="password-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || isSuccess || !isFormValid}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : isSuccess ? (
                "Success!"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:underline">
              Forgot your password?
            </button>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <button className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:underline">
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
