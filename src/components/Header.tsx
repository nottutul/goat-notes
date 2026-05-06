import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { shadow } from '@/styles/utils'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils' 
import DarkModeToggle from './DarkModeToggle'
import LogoutButton from './LogoutButton'

const Header = () => {
  const user = null;
    
  return (
    <header className='relative flex h-24 w-full items-center gap-5 bg-popover px-3 sm:px-8' style={{boxShadow: shadow}}>

        <Link href="/" className='flex items-center gap-3'>
            <Image 
              src="/goatnotesicon.png" 
              alt="goaticon" 
              width={60} 
              height={60} 
              priority 
              className='rounded-full'
            />
        
            <h1 className='text-2xl font-black leading-none flex flex-col tracking-tight uppercase'>
                <span>Goat</span>
                <span className='text-muted-foreground font-medium lowercase first-letter:uppercase'>Notes</span>
            </h1>
        </Link>

        <div className='flex ml-auto gap-2'>
          {user ? (
            <LogoutButton /> 
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: "default" })}>
                  Login
              </Link>
              
              <Link 
                href="/signup" 
                className={cn(
                  buttonVariants({ variant: "outline" }), 
                  "hidden sm:inline-flex" 
                )}
              >
                 Sign Up
              </Link>
            </>
          )} 
          <DarkModeToggle/>
        </div>
    </header>
  )
}

export default Header