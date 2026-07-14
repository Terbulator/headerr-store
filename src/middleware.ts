// @ts-ignore
import { clerkMiddleware } from '@clerk/nextjs/server';

// 1. ADD THIS LINE: Force Vercel to bypass the Edge network
export const runtime = 'nodejs';

export default clerkMiddleware(async (auth: any, req: any) => {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    await auth.protect(); 
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};