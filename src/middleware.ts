// @ts-ignore
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth: any, req: any) => {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    await auth.protect(); 
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};