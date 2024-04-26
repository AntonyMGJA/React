import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';

import {NextResponse} from 'next/server'

export async function middleware(req){

    const res = NextResponse.next();
    
    const supabase = createMiddlewareClient({req, res})

    const {data: {user}} = await supabase.auth.getUser();

    if(user){

        if(req.nextUrl.pathname === '/'){
            return NextResponse.redirect(new URL('/Tienda', req.url))
        }
        
        if(req.nextUrl.pathname === '/formUser'){
            return NextResponse.redirect(new URL('/Tienda', req.url))
        }
        
        if(req.nextUrl.pathname === '/login'){
            return NextResponse.redirect(new URL('/Tienda', req.url))
        }

    }

    if(!user){

        if(req.nextUrl.pathname === '/password'){
            return NextResponse.redirect(new URL('/Tienda', req.url))
        }

        if (req.nextUrl.pathname === '/Tienda'){
            return NextResponse.redirect(new URL('/', req.url))
        }
        if (req.nextUrl.pathname === '/Recuperar'){
            return NextResponse.redirect(new URL('/', req.url))
        }

    }

    return res;

}

export const config = {
    matcher: ['/', '/Tienda', '/formUser', '/password', '/login', '/Recuperar']
}