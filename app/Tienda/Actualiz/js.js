"use server"
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function productList(){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    let { data: Producto, error } = await supabase
  .from('Producto')
  .select("*")
  return (Producto)
}


export async function productfilt(cond){
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  if(cond == true){
  let { data: Producto, error } = await supabase
  .from('Producto')
  .select("*")
  .gte('price', 1)
  
  console.log(Producto)
  console.log(error)
  return (Producto)
  }

  if(cond == false){
    let { data: Producto, error } = await supabase
    .from('Producto')
    .select("*")
    .lte('price', 100000000)


    console.log(Producto)
    console.log(error)
    return (Producto)
    }

}

export async function productfind(id){
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  let { data: Producto, error } = await supabase
  .from('Producto')
  .select("*")
  .eq('id', id)
  .single()

  return (Producto)
}

export async function InsertP(formData){

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const { id, name, price, descripcion, stock } = Object.fromEntries(formData.entries());

  if (id == null || name === null || price === null || descripcion === null || stock === null) {
    return {
        status: false,
        message: "Se requieren algunos valores",
        errors: null,
        params: { id, name, price, descripcion, stock}
    }
}

  try {
    const { error } = await supabase.from('Producto').update([{ name, price, descripcion, stock}]).eq('id', id).select();

    if (error) {
        return {
            status: false,
            message: ` Ocurrio un error de tipo ${error.message},` ,
            errors: null,
            params: { name, price, descripcion, stock }
        };
    }

    return {
        status: true,
        message: "La data se inserto",
        errors: null,
        params: { name, price, descripcion, stock }
    };
} catch (error) {
    return {
        status: false,
        message:` Ocurrio un error de tipo ${error}` ,
        errors: null,
        params: { name, price, descripcion, stock }
    };
}

}