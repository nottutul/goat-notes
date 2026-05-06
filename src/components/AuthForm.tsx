"use client"

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

type Props = {
    type: "login" | "signup";
}

const AuthForm = ({type}: Props) => {
  const isLogin = type === "login"
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    console.log("Form data submitted")
  }

  const [isPending, startTransition] = useTransition(); 

   return <form>
    <CardContent className='grid w-full items-center gap-4'>
       <div className='flex flex-col space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder='Enter your Email' 
          required 
          disabled={isPending}/>
        </div> 
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input 
          id="password" 
          name="password" 
          type="password" 
          placeholder='Enter your password' 
          required 
          disabled={isPending}/>
        </div>
    </CardContent>
    <CardFooter className='mt-6 flex flex-col gap-4'> 
        <Button type="submit" className="w-full">
            {isPending ? <Loader2 className='animate-spin'/> : isLogin ? "Login" : "Sign Up"}
        </Button>
        <p className="mt-5 text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}{" "}
            <Link href={isLogin? "/signup" : "/login"} className='text-blue-600 hover:underline'>
                {isLogin ? "Sign Up" : "Login"}
            </Link>
            
        </p> 
    </CardFooter>
   </form>
     
  

}



export default AuthForm