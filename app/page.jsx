"use client"
import AuthForm from "./components/AuthForm"
import './globals.css'

export default function Home() {
  return (
    <>
    <nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button typeof="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" ariacontrols="mobile-menu" ariaexpanded="false">
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
              <a href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</a>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        </div>
      </div>
    </div>
  </nav>

    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Login sencillo
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Solo correo
          </p>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <AuthForm />
          </div>
      </div>
  </div>

  </>
  )
}
