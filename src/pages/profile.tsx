import { ChangePasswordForm, UpdateProfileForm } from '@/components/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function ProfilePage() {
  return (
    <Card className="mx-auto w-full max-w-2xl grow">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateProfileForm />
        <Separator className="my-6" />
        <CardTitle>Change password</CardTitle>
        <CardDescription className="mt-1.5 pb-6">Update your password.</CardDescription>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}
