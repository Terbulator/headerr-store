// @ts-ignore
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth: any, req: any) => {
  // Dead-simple check: If the URL contains /admin, lock the door.
  if (req.nextUrl.pathname.startsWith('/admin')) {
    auth().protect();
  }
});

export const config = {
  // A much simpler, standard Next.js matcher
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};