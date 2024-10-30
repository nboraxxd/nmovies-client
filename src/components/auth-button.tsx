import { Link } from 'react-router-dom'
import { cva } from 'class-variance-authority'
import {
  CircleUserRoundIcon,
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  FolderHeartIcon,
  MessageSquareMoreIcon,
} from 'lucide-react'

import { cn } from '@/utils'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useGetProfileQuery } from '@/lib/tanstack-query/use-profile'
import { UserDocumentResponseType } from '@/lib/schemas/profile.schema'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function AuthButton() {
  const isAuth = useAuthStore((state) => state.isAuth)

  const { data, isSuccess, isLoading } = useGetProfileQuery({ enabled: isAuth })

  if (isLoading) return <Skeleton className="size-10" />

  return isSuccess ? (
    <UserButton user={data.data} />
  ) : (
    <Button className="w-10 gap-1.5 max-md:p-0 md:w-auto" asChild>
      <Link to="/login">
        <CircleUserRoundIcon className="size-5 md:hidden" />
        <LogInIcon className="hidden size-5 md:block" />
        <span className="hidden md:inline">Log In</span>
      </Link>
    </Button>
  )
}

function UserButton({ user }: { user?: UserDocumentResponseType }) {
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar user={user} variant="square" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4 font-medium sm:w-64" align="end">
        <DropdownMenuLabel className="mb-4 flex flex-col items-center gap-1 rounded-lg bg-primary/60 p-4 text-xs text-secondary-foreground">
          <UserAvatar user={user} />
          <p className="mt-1 line-clamp-1">{user.name}</p>
          <p className="line-clamp-1 break-all font-medium">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="group cursor-pointer gap-2 transition-colors focus:text-primary">
              <SettingsIcon className="size-3.5 transition-transform group-hover:rotate-180" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/favorites" className="group cursor-pointer gap-2 transition-colors focus:text-primary">
              <FolderHeartIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              My favorites
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/comments" className="group cursor-pointer gap-2 transition-colors focus:text-primary">
              <MessageSquareMoreIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              My comments
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="group w-full cursor-pointer gap-2 transition-colors focus:text-primary">
            <LogOutIcon className="size-3.5 transition-transform group-hover:scale-90" />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}

function UserAvatar({ user, variant }: { user: UserDocumentResponseType; variant?: 'square' }) {
  const variantOptions = cva('', {
    variants: {
      variant: {
        square: 'rounded-md',
      },
    },
  })

  return (
    <Avatar className={cn(variantOptions({ variant }))}>
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="relative flex size-full shrink-0 object-cover" />
      ) : (
        <AvatarFallback className={cn(variantOptions({ variant }), 'text-lg font-semibold')}>
          {user.name ? user.name.charAt(0).toLocaleUpperCase() : user.email?.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
