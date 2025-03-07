import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request : NextRequest){
    const isLogin = request.cookies.get("next.auth.session-token")?.value
        if(!isLogin){
            return NextResponse.redirect(new URL("/login",request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher : "/profile/"
}