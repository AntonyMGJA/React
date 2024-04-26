"use server"
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function productList(busqueda){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    let { data: Producto, error } = await supabase
  .from('Producto')
  .select("*")
  .eq("name", busqueda)

  console.log(Producto)

  return Producto
}

