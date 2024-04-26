"use server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// import { supabase } from "../supabase/client";

export async function signUpNewUser( formData ) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const { correo, passw } = Object.fromEntries(formData.entries());

  if (correo === null || passw === null) {
    return {
        status: false,
        message: "Se requieren algunos valores",
        errors: null,
        params: { correo, passw}
    }
}

  try {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: passw,
      options: {
        emailRedirectTo: 'http://localhost:3000/login',
      },
  })

    if (error) {
        return {
            status: false,
            message: ` Ocurrio un error de tipo ${error.message},` ,
            errors: null,
            params: { correo, passw }
        };
    }

    return {
        status: true,
        message: "La data se inserto",
        errors: null,
        params: { correo, passw }
    };
} catch (error) {
    return {
        status: false,
        message:` Ocurrio un error de tipo ${error}` ,
        errors: null,
        params: { correo, passw }
    };
}
}

export async function signInWithEmail( formData ) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const { correo, passw } = Object.fromEntries(formData.entries());

  if (correo === null || passw === null) {
    return {
        status: false,
        message: "Se requieren algunos valores",
        errors: null,
        params: { correo, passw}
    }
}

try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo,
    password: passw,
  })

  if (error) {
      return {
          status: false,
          message: ` Ocurrio un error de tipo ${error.message},` ,
          errors: null,
          params: { correo, passw }
      };
  }


  return {
      status: true,
      message: "La data se inserto",
      errors: null,
      params: { correo, passw }
  };
} catch (error) {
  return {
      status: false,
      message:` Ocurrio un error de tipo ${error}` ,
      errors: null,
      params: { correo, passw }
  };
}
}


export async function setLogin(formData) {

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const { correo } = Object.fromEntries(formData.entries());

  // try{
    const { data, error } = await supabase.auth.signInWithOtp({
      email: correo,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        emailRedirectTo: 'http://localhost:3000/Recuperar',
      },
    })

    return {
       status: false,
        message: ` Ocurrio un error de tipo ${error.message},` ,
        errors: error,
       params: { correo }
      };

    console.log(data, error, correo)
}

  // const { data, error } = await supabase.auth.signInWithOtp({
  //   email: correo,
  //   options: {
  //     // set this to false if you do not want the user to be automatically signed up
  //     shouldCreateUser: true,
  //     emailRedirectTo: 'http://localhost:3000/Recuperar'
  //    },
  //   })

  //   if (error) {
  //     return {
  //         status: false,
  //         message: ` Ocurrio un error de tipo ${error.message},` ,
  //         errors: error,
  //         params: { correo }
  //     };
  //   }
  //   console.log(data)
//   }

// catch(error){
//   if (error) {
//     return {
//         status: false,
//         message: ` Ocurrio un error de tipo ${error},` ,
//         errors: error,
//         params: { correo }
//     };
// }

// export async  function GET(req){
//     const cookieStore = cookies();
//     const supabase = createRouteHandlerClient({cookies: () => cookieStore});

//     const {searchParams} = new URL(req.url)

//     const code = searchParams.get('code')

//     if (code){
//         await supabase.auth.exchangeCodeForSession(code)
//     }

//     return NextResponse.redirect(new URL('/Tienda', req.url))
// }


export async function updatePassw(formData){
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({cookies: () => cookieStore});

  const { passw } = Object.fromEntries(formData.entries());
  
  try{
  await supabase.auth.updateUser({ password: passw })
  }
  catch(error){
    return error
  }
  console.log(passw)

}