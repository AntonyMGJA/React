"use client"
import { useState, useEffect } from "react"
import { productList, productfilt } from "./js"
import { useRouter } from 'next/navigation'
import '../../globals.css'

export default function Example() {
    const [Nombre, setNombre] = useState([])
    const [Filter, setFilter] = useState("");

    const router = useRouter();

    useEffect(() => {
        const setData = async()=>{
            const valor = await productList()
            setNombre(valor)
          }
          setData()
      },[])

    async function nuevo(){
      const valor = await productfilt(Filter)
      setNombre(valor)
      console.log(Nombre)
    }

    


  return (
    <>
    <div class="min-h-full">
  <nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" srcSet="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
          </div>
          <div className="hidden md:block">
            
            <div className="ml-10 flex items-baseline space-x-4">
              <a hrefLang="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Actualizaciones</a>
              <a hrefLang="/Tienda" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Regresar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <br />
    <div className="container justify-between align-middle sm:flex-col sm:items-end">
      <button onClick={()=>{setFilter(false);  nuevo()}} type="button" class="leading-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Caro
      </button>

      <button onClick={()=>{setFilter(true);  nuevo()}} type="button" class="leading-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Barato
      </button>
    </div>
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <ul role="list" className="divide-y divide-gray-100">
    <ul role="list" className="divide-y divide-gray-100">
      {Nombre.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-500">Articulo: {person.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">Objeto: {person.descripcion}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-400">$$$ {person.price}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Stock: <strong>{person.stock}</strong>
              </p>
              <button typeof="button" onClick={async () => {router.push('/Tienda/Actualiz/'+person.id); }}>
              Actualizar
              </button>
          </div>
        </li>
      
      ))}
    </ul>
    </ul>
    </div>
  </main>
</div>

  </>
  )
}
