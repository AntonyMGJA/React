"use client"
import { useState } from "react";
import { setLogin } from"../js"

export default function Example() {


  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)
  const [productData, setProductData] = useState({
      correo: ""

  })

  const validateData = (form) => {
    form.preventDefault()
    let errorList = {}

    if (!productData.correo) {
        errorList.correo = "Se necesita un correo";
    
    }

    sendProductData()
}


  const checkValue = (value) => {
    // return (value.trim() != '' && /^[a-zA-Z]+$/.test(value) );

    return (value.trim() != '' || /^[a-z0-9]+$/i.test(value));

}

  const sendProductData = async () => {
      try {
          const formData = new FormData();
          formData.append('correo', productData.correo);

          const response = await setLogin(formData);

          if (response.status) {
              // Enviar los datos de forma exitosa
              console.log('El dato del producto fue envio de forma exitosa:', response.message);
          } else {
              // Manejar error del servidor
              console.error('Error procesando data:', response.message);
              setErrors(response.errors || {});
          }
      } catch (error) {
          console.error('Error sending data:', error.message);
      }
  };

  const setValueToState = (event) => {
      const { name, value } = event.target;

      let valueToCheck = checkValue(value);

      if (valueToCheck) {
          setIsValid(true);
          setProductData(data => ({
              ...data,
              [name]: value,
          }));
      } else {
          setIsValid(false);
      }

  }


  return (
    <>
<nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button typeof="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" ariacontrols="mobile-menu" ariaexpanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ariahidden="true">
              <path strokelinecap="round" strokelinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ariahidden="true">
              <path strokelinecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <a href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" ariacurrent="page">Tienda</a>
              <a href="/formUser" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Agregar user</a>
              <a href="/formUser" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logiut</a>

            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        </div>
      </div>
    </div>
  </nav>

    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w1xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Recuperacion</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Dame tu correo para verificar
        </p>
      </div>
      <form onSubmit={validateData} className="mx-auto mt-16 max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">

          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Correo
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name='correo'
                id="first-name"
                autoComplete="given-name"
                value={productData.correo}
                onChange={setValueToState}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Let's talk
          </button>
        </div>
      </form>
    </div>
</>
  )
}