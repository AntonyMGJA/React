"use client"
import { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useRouter } from 'next/navigation'
import { productL } from './js'

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '540px',
  width: '100%'
}


const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 3'
  },
];

export default function Vistas(){
  const [Producto, setProducto] = useState([]);

  useEffect(() => {
    const data = async () => {
      const list = await productL()
      setProducto(list)
    };
    data()
  }, []);

  const router = useRouter();

    return (
      <>
      <div className="bg-gray-600">

      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index} >
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>

      <main>
          <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className=" text-gray-600">Articulos</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {Producto.map((product) => (
               <button onClick={async ()=>{router.push('/Tienda/'+product.id)}}>
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                          <span ariahidden="true" className="absolute inset-0" />
                        Producto: {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">Existencias: {product.stock}</p>
                    </div>

                    <p className="text-sm font-medium text-gray-900">$$$ - {product.price}</p>
                  </div>
                  <div>
                  </div>
                  </div>
                </div>
                </button>

              ))}
            </div>
          </div>
        </main>

     </div>
        </>
      )
}
