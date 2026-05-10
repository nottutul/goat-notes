"use client"

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { loginAction, signUpAction } from '@/actions/users';

type Props = {
    type: "login" | "signup";
}

const AuthForm = ({type}: Props) => {
  const isLoginForm = type === "login"
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  
  
  const handleSubmit = (formData: FormData) => {
    startTransition(async ()=>{
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        let errorMassage;
        let title; 
        let description;

        if (isLoginForm){
            errorMassage = (await loginAction(email, password)).errorMassage;
            title = 'Logged In'
            description = 'You have been logged in successfully'
        }
        else{
            errorMassage = (await signUpAction(email, password)).errorMassage;
            title = 'Signed Up'
            description = 'Check Your Email for Confirmation'
        }

        if(!errorMassage){
            toast(title ,{description});
            router.replace('/');
        }else{
            toast(title ,{description: errorMassage});
        }
    })
  }





   return <form action={handleSubmit}>
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
            {isPending ? <Loader2 className='animate-spin'/> : isLoginForm ? "Login" : "Sign Up"}
        </Button>
        <p className="mt-5 text-center">
            {isLoginForm ? "Don't have an account? " : "Already have an account? "}{" "}
            <Link href={isLoginForm? "/signup" : "/login"} className='text-blue-600 hover:underline'>
                {isLoginForm ? "Sign Up" : "Login"}
            </Link>
            
        </p> 
    </CardFooter>
   </form>
     
  

}



export default AuthForm