import { toast } from 'sonner'
import { LoaderCircleIcon } from 'lucide-react'

import { useAuthStore } from '@/lib/stores/auth-store'
import { useResendEmailVerification } from '@/lib/tanstack-query/use-auth'

import { Button } from '@/components/ui/button'

export default function CallToVerify() {
  const profile = useAuthStore((state) => state.profile)

  const { mutateAsync, isPending } = useResendEmailVerification()

  const handleResendEmail = async () => {
    if (isPending) return

    const response = await mutateAsync()
    toast.success(response.message)
  }

  return profile && !profile.isVerified ? (
    <div className="h-8 w-full bg-primary print:hidden">
      <div className="flex h-full items-center justify-center gap-3 px-2">
        <div className="flex flex-col gap-x-1 text-balance text-[10px] font-medium text-white sm:flex-row sm:text-xs">
          Your account is not verified.
          <strong className="font-semibold">Check your email or resend email.</strong>
        </div>
        <Button
          size="none"
          className="gap-1.5 bg-white px-3 py-1 text-[10px] font-semibold text-primary transition-colors hover:bg-white disabled:opacity-70 sm:text-xs"
          onClick={handleResendEmail}
          disabled={isPending}
        >
          {isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
          Resend email
        </Button>
      </div>
    </div>
  ) : null
}
