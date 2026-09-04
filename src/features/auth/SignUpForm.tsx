import { Button } from "@/components/ui/button"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, type FC } from "react"
import type { ErrorCodes } from "./types"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import cloudberry from "@/assets/cloudberry.svg"
import google from "@/assets/google.svg"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type SignUpSchema } from "./validation"
import { useMutation } from "@tanstack/react-query"
import type { Response } from "@/shared/types"
import { toast } from "sonner"

export const SignUpForm: FC = () => {
  const params: Record<string, ErrorCodes> = useSearch({ strict: false })
  const navigate = useNavigate()

  useEffect(() => {
    if (params.error === "local_email_not_verified") {
      toast.error("Error signing up", {
        id: "signUpError",
        description:
          "An unverified account with this email already exists. Verify it to link your Google account.",
        position: "top-center"
      })
    }
  }, [params])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })

  const mutation = useMutation({
    mutationFn: async (data: SignUpSchema) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data)
      })
      const parsed: Response<unknown> = await response.json()
      if (!response.ok) throw new Error(parsed.message || "Internal server error")
    },
    onError: (error) => {
      toast.error("Error signing up", {
        id: "signUpError",
        description: error.message,
        position: "top-center"
      })
    },
    onSuccess: () => {
      navigate({ to: "/" })
      toast.success("Welcome to multe", {
        id: "signUpSuccess",
        position: "top-center"
      })
    }
  })

  const onSubmit = (data: SignUpSchema) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img src={cloudberry} alt="multe logo" className="h-6" />
        <h1 className="text-2xl">Sign up for multe</h1>
      </div>
      <div className="flex flex-col justify-center gap-4 pt-[25%]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input {...register("name")} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input {...register("email")} />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input type="password" {...register("password")} />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>
          <Button type="submit">Sign up</Button>
        </form>
        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">or</p>
          <Separator className="flex-1" />
        </div>
        <Link to="/sign-in" className="w-full">
          <Button variant="link" className="w-full">
            Already have an account? Sign in
          </Button>
        </Link>
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/sign-in?return_error=/sign-up&return_success=/`}
        >
          <Button variant="outline" className="w-full flex gap-2">
            <img src={google} alt="google logo" className="h-4" />
            Continue with Google
          </Button>
        </a>
      </div>
    </div>
  )
}