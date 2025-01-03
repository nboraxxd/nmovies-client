import { toast } from 'sonner'
import queryString from 'query-string'
import { cva } from 'class-variance-authority'
import { Link, useLocation } from 'react-router-dom'
import {
  CircleUserRoundIcon,
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  FolderHeartIcon,
  MessageSquareMoreIcon,
} from 'lucide-react'

import { cn } from '@/utils'
import { PATH } from '@/constants/path'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useLogout } from '@/lib/tanstack-query/use-auth'
import { useGetProfileQuery } from '@/lib/tanstack-query/use-profile'
import { getRefreshTokenFromLocalStorage } from '@/utils/local-storage'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LazyLoadImage } from '@/components/common'

function AuthButton() {
  const isAuth = useAuthStore((state) => state.isAuth)
  const { pathname } = useLocation()
  const next = queryString.stringify({ next: pathname })

  return isAuth ? (
    <UserButton />
  ) : (
    <Button className="ml-auto w-10 gap-1.5 max-md:p-0 md:w-auto" asChild>
      <Link to={{ pathname: PATH.LOGIN, search: pathname !== PATH.HOMEPAGE ? next : undefined }}>
        <CircleUserRoundIcon className="size-5 md:hidden" />
        <LogInIcon className="hidden size-5 md:block" />
        <span className="hidden md:inline">Log In</span>
      </Link>
    </Button>
  )
}

function UserButton() {
  const refreshToken = getRefreshTokenFromLocalStorage()

  const logoutMutation = useLogout()
  const profileQuery = useGetProfileQuery()

  async function handleLogout() {
    if (logoutMutation.isPending || !refreshToken) return

    const response = await logoutMutation.mutateAsync({ refreshToken })
    toast.success(response.message)
  }

  if (profileQuery.isLoading) return <Skeleton className="ml-auto size-10" />

  return profileQuery.isSuccess ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto cursor-pointer" asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar avatar={profileQuery.data.data.avatar} name={profileQuery.data.data.name} variant="square" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4 font-medium sm:w-64" align="end">
        <DropdownMenuLabel className="mb-4 flex flex-col items-center gap-1 rounded-lg bg-primary/60 p-4 text-xs text-secondary-foreground">
          <UserAvatar name={profileQuery.data.data.name} avatar={profileQuery.data.data.avatar} variant="round" />
          <p className="mt-1 line-clamp-1">{profileQuery.data.data.name}</p>
          <p className="line-clamp-1 break-all font-medium">{profileQuery.data.data.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="group cursor-pointer gap-2 transition-colors focus:text-foreground">
              <SettingsIcon className="size-3.5 transition-transform group-hover:rotate-180" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/profile/favorites"
              className="group cursor-pointer gap-2 transition-colors focus:text-foreground"
            >
              <FolderHeartIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              My favorites
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/reviews" className="group cursor-pointer gap-2 transition-colors focus:text-foreground">
              <MessageSquareMoreIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              My reviews
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="group w-full cursor-pointer gap-2 transition-colors focus:text-foreground"
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
          >
            <LogOutIcon className="size-3.5 transition-transform group-hover:scale-90" />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}

interface UserAvatarProps {
  name: string
  avatar: string | null
  className?: string
  variant?: 'square' | 'round'
}

function UserAvatar({ name, avatar, className, variant }: UserAvatarProps) {
  const variantOptions = cva('', {
    variants: {
      variant: {
        square: 'rounded-md',
        round: 'rounded-full',
      },
    },
  })

  return (
    <Avatar className={cn(className, variantOptions({ variant }))}>
      {avatar ? (
        <LazyLoadImage src={avatar} alt={name} className="relative flex shrink-0" />
      ) : (
        <AvatarFallback className={cn(variantOptions({ variant }), 'text-lg font-semibold')}>
          {name.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export { AuthButton, UserButton, UserAvatar }
