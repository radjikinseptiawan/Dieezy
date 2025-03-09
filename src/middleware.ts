import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request : NextRequest){
    const isLogin = request.cookies.get("next.auth.session-token")?.value
    const isBrowserRequest = request.headers.get("referer")?.includes(request.nextUrl.origin)
    
    if (request.nextUrl.pathname.startsWith("/api/") && !isBrowserRequest) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    if(request.nextUrl.pathname.startsWith("/dashboard") && !isLogin){
            return NextResponse.redirect(new URL("/login",request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher : ["/dashboard/","/api/:path*"]
}