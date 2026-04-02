import React, { useState } from "react" // Don't forget to import useState!
import { RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function InputOTPForm() {
  const [value, setValue] = useState("")

  const handleVerify = () => {
    if (value.length < 6) {
      alert("Please enter a full 6-digit code")
      return
    }
    console.log("Submitted OTP:", value);
    // You would typically call your API here:
    // verifyOtp(value)
  };

  return (
    <Card className="mx-auto max-w-md shadow-lg mt-10">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium text-black">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field className="space-y-4">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <RefreshCwIcon className="h-3 w-3" />
              Resend Code
            </Button>
          </div>

          {/* CENTERING LOGIC: justify-center on the group */}
          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={value} 
              onChange={(val) => setValue(val)} 
              id="otp-verification" 
              required
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <FieldDescription>
            <a href="#" className="hover:underline">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button onClick={handleVerify} type="button" className="w-full">
          Verify
        </Button>
        <div className="text-sm text-muted-foreground text-center">
          Having trouble signing in?{" "}
          <a
            href="#"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            Contact support
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}