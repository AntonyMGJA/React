"use server"
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function productList(){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    let { data: Producto, error } = await supabase
  .from('Producto')
  .select('*')

}

export async function InsertP(formData){

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const { name, price, descripcion, stock } = Object.fromEntries(formData.entries());

  if (name === null || price === null || descripcion === null || stock === null) {
    return {
        status: false,
        message: "Se requieren algunos valores",
        errors: null,
        params: { name, price, descripcion, stock}
    }
}

  try {
    const { error } = await supabase.from('Producto').insert([{ name, price, descripcion, stock}]).select();

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