"use server"
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function productList(id){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  
    let { data: Producto, error } = await supabase
    .from('Producto')
    .select("*")
    .eq('id', id)
    .single()

    return (Producto)
}

export async function productL(){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  
    let { data: Producto, error } = await supabase
    .from('Producto')
    .select("*")

    return (Producto)
}

export async function productReferentes(ref){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    let { data: Product, error } = await supabase
    .from('Producto')
    .select("*")
    .gte('price', ref)

    

    return (Product)
}

export async function productReferentes2(ref){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    let { data: Product, error } = await supabase
    .from('Producto')
    .select("*")
    .lte('price', ref)

    

    return (Product)
}

export async function productBusq(busq){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  
    let { data: Product, error } = await supabase
    .from('Producto')
    .select("*")
    .like('name', `% ${busq} %`)

    return (Product)
}


export async function comentList(id){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});
  

    let { data: comentarios, error } = await supabase
    .from('comentarios')
    .select('*')  
    .eq('pid', id)

    return comentarios
}

export async function postcoment(formData){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const { coment, id } = Object.fromEntries(formData.entries());
  
    const { data, error } = await supabase
    .from('comentarios')
    .insert([
      { content: coment, pid: id},
    ])
    .select()
}