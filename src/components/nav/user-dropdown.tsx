import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User } from '@/types'
import { LogOut } from 'lucide-react'
import { ButtonLoading } from '../ui/button-loading'

type UserDropDownProps = {
    user: User
    logout: () => void
    isLoading: boolean
}

export const UserDropDown = ({
    user,
    logout,
    isLoading,
}: UserDropDownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                    <Avatar className='border-2 bg-transparent'>
                        <AvatarImage src='/placeholder-user.jpg' />
                        <AvatarFallback className='bg-transparent'>
                            {user.firstName.at(0)?.toUpperCase()}
                            {user.lastName.at(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className='sr-only'>Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <div className='flex items-center gap-2 p-2'>
                    <Avatar className='border-2 bg-transparent'>
                        <AvatarImage src='/placeholder-user.jpg' />
                        <AvatarFallback className='bg-transparent'>
                            {user.firstName.at(0)?.toUpperCase()}
                            {user.lastName.at(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className='grid gap-0.5 leading-none'>
                        <div className='font-semibold'>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                            {user.email}
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <ButtonLoading
                        className='flex w-full items-center gap-2 hover:border-none'
                        loadingClassName='text-primary-black'
                        variant={'ghost'}
                        onClick={logout}
                        isLoading={isLoading}
                    >
                        <LogOut />
                        <span>Logout</span>
                    </ButtonLoading>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
