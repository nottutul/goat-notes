import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const handleError = (error: unknown)=>{
    if(error instanceof Error) return {errorMassage:error.message};
    else return {errorMassage:"An error occurred, please try again later"};
}