import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/" })
      }}
    >
      <button type="submit" className="flex justify-center items-center h-screen pointer-events-auto">Sign in</button>
    </form>
  )
} 