"use client"
import { useState, useEffect } from "react";
import Select from "./select"
import {productList} from "./actions"

export default function Vistas(){
  const [Nombre, setNombre] = useState("");

  const [Contenido, setContenido] = useState([{
    id: 7,
    name: 'Leche',
    price: '23',
    descripcion: 'NutriLeche',
    stock: 30
  }]);
    const  mostar = (e)=>{
      e.preventDefault();
      return  productList(Nombre)
      useEffect(() => {
        const setData = ()=>{
            setContenido(data);
          }
      }, []);
    }

    console.log(Contenido)

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
              <a href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" ariacurrent="page">Productos</a>
              <a href="/Tienda/NuevoP" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Agregar producto</a>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div className="grid grid-cols-1 gap-x-4 gap-y-9 sm:grid-cols-6">
    <div className="sm:col-span-4">
    <div className="mt-2">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input typeof="text" onChange={e=>setNombre(e.target.value)} name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Nombre"/>
        <a className="flex select-none items-center pl-3 text-gray-500 sm:text-sm" onClick={mostar} >Buscar</a>
      </div>
    </div>
  </div>
  </div>

        </div>
      </div>
    </div>
  </nav>
  
        <Select/>
        <div className="bg-gray-600">
          <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Articulos</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            { Contenido.map((product) => {
    return (
    <div key={product.id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a>
              <span ariahidden="true" className="absolute inset-0" />
            Producto: {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">Existencias: {product.stock}</p>
          <p className="text-sm font-medium text-gray-900">Descripcion - {product.descripcion}</p>
        </div>

        <p className="text-sm font-medium text-gray-900">$$$ - {product.price}</p>
      </div>
      </div>
    </div>
    )})}
            </div>
          </div>
        </div>
        </>
     )
}

