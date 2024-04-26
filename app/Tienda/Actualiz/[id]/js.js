"use server"
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function productList(){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    let { data: Producto, error } = await supabase
  .from('Producto')
  .select('*')
  return (Producto)
}