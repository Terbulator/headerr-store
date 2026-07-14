// @ts-ignore
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 1. We isolate your security guard
const clerkGuard = clerkMiddleware(async (auth: any, req: any) => {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    await auth.protect(); 
  }
});

// 2. We wrap it in a global catcher to intercept Vercel edge crashes
export default async function middleware(req: any, event: any) {
  try {
    return await clerkGuard(req, event);
  } catch (error: any) {
    // If it crashes, print the EXACT reason directly to the browser screen!
    return new NextResponse(`🚨 CLERK CRASH REPORT: ${error.message || 'Unknown edge error'}`, { 
      status: 500,
      headers: { 'content-type': 'text/plain' }
    });
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};