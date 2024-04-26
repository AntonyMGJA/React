'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Navbar } from '../Nav'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { productList, productReferentes, productReferentes2, comentList, postcoment } from "../js"

export default function Select( {params} ) {
  


const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '750px'
}

const slideImages = [
  {
    url: 'https://cdn-icons-png.flaticon.com/512/39/39887.png',
    caption: 'Slide 1'
  },
  {
    url: 'https://cdn-icons-png.flaticon.com/512/792/792030.png',
    caption: 'Slide 2'
  },
  {
    url: 'https://th.bing.com/th/id/OIP.fsffvepLqKjz1THNJARozAHaFJ?rs=1&pid=ImgDetMain',
    caption: 'Slide 3'
  },
];

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: './Captura de pantalla 2024-04-09 211650.png',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: false },
    { name: 'XL', inStock: false },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: false },
  ],
  description:
    'Text del articulo.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ]
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const [Name, setName] = useState([])
  const [Referent, setReferent] = useState([])
  const [Referent2, setReferent2] = useState([])
  const [coment, setcoment] = useState([])

  const produc = params.select

  useEffect(() => {
    const setData = async()=>{
        
      const valor = await productList(produc)

      const val = await productReferentes(valor.price)

      const dat = await productReferentes2(valor.price)

      const com = await comentList(produc)
        
        setName(valor)
        setReferent(val)
        setReferent2(dat)
        setcoment(com)
      }
      setData()
  },[])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)
  const [productData, setProductData] = useState({
      coment: "",

  })





  // interface errorShow{
  //     name:string,
  //     description:string,
  //     price:string,
  // }

  const validateData = (form) => {
      form.preventDefault()
      let errorList = {}

      if (!productData.coment) {
          errorList.coment = "Se necesita un nombre";

      }

      if (Object.keys(errorList).length > 0) {
          setErrors(errorList);
          return;
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
          formData.append('coment', productData.coment);
          formData.append('id', produc);

          const response = await postcoment(formData);

          if (response.status) {
              // Enviar los datos de forma exitosa
              console.log('El dato del producto fue envio de forma exitosa:', response.message);
          } else {
              // Manejar error del servidor
              console.error('Error procesando data:', response.message);
              setErrors(response.errors || {});
          }
      } catch (error) {
          console.error('Error sending product data:', error.message);
      }
      alert("Nuevo registro")
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
    <div className="bg-white">
      <div className="pt">

      <Navbar/>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Name.name}</h1>
            
          </div>


          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
        
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            src="https://image.freepik.com/vector-gratis/ilustracion-concepto-proceso-creacion-prototipos_114360-2084.jpg"
            alt={product.images[3].alt}
            className="h-full w-full object-cover object-center"
          />
        </div>
<br/>
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{Name.price}</p>
            

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Tamaño</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">Descripcion: {Name.descripcion}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Detalles</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Existencias</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{Name.stock}</p>
              </div>

              <br />
              <br />

              <h2 className="text-sm font-medium text-gray-900">Producto similares</h2>
              <div className="slide-container">

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 border-t border-gray-200 pt-8 sm:mt-16 sm:pt-12 lg:h-90 lg:max-w-none lg:grid-cols-2">
          <Slide>
             {Referent.map((Ref)=> (
               <button onClick={async ()=>{router.push('/Tienda/'+Ref.id)}}>
               <div key={Ref.id} className="group relative">
                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-90">
                 <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                
                <img
                src="https://image.freepik.com/vector-gratis/ilustracion-concepto-proceso-creacion-prototipos_114360-2084.jpg"
                alt={product.images[3].alt}
                className="h-full w-full object-cover object-center"/>
        </div>
                 <div className="mt-4 flex justify-between">
                   <div>
                     <h3 className="text-sm text-gray-700">
                       <a>
                         <span ariahidden="true" className="absolute inset-0" />
                       Producto: {Ref.name}
                       </a>
                     </h3>
                     <p className="mt-1 text-sm text-gray-500">Existencias: {Ref.stock}</p>
                   </div>

                   <p className="text-sm font-medium text-gray-900">$$$ - {Ref.price}</p>
                 </div>
                 <div>
                 </div>
                 </div>
               </div>
               </button>
            ))} 
          </Slide>

          <Slide>
             {Referent2.map((Ref)=> (
               <button onClick={async ()=>{router.push('/Tienda/'+Ref.id)}}>
               <div key={Ref.id} className="group relative">
                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-90">
                 <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                
                <img
                src="https://image.freepik.com/vector-gratis/ilustracion-concepto-proceso-creacion-prototipos_114360-2084.jpg"
                alt={product.images[3].alt}
                className="h-full w-full object-cover object-center"/>
        </div>
                 <div className="mt-4 flex justify-between">
                   <div>
                     <h3 className="text-sm text-gray-700">
                       <a>
                         <span ariahidden="true" className="absolute inset-0" />
                       Producto: {Ref.name}
                       </a>
                     </h3>
                     <p className="mt-1 text-sm text-gray-500">Existencias: {Ref.stock}</p>
                   </div>

                   <p className="text-sm font-medium text-gray-900">$$$ - {Ref.price}</p>
                 </div>
                 <div>
                 </div>
                 </div>
               </div>
               </button>
            ))} 
          </Slide>
          </div>
          
        </div>
<br />
<br />

    <div className="mx-auto max-w-7xl py-6 sm:px-6">
    <ul role="list" className="divide-y divide-dark-100">
    <ul role="list" className="divide-y divide-gray-700 border-gray-700">
    <form onSubmit={validateData}>
      <div className='flex flex-col gap-3 '>
        <label htmlFor="name"> Nombre</label>
        <input type="text" value={productData.coment} onChange={setValueToState}  name='coment' placeholder='product' className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 `}  />
        <p className='text-rose-600'>{errors.coment}</p>
        <button type="submit" className='p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800'>Añadir comentario</button>

        </div>
      </form>
    </ul>
    </ul>

    <main>
    <br />

    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <ul role="list" className="divide-y divide-gray-700">
    <ul role="list" className="divide-y divide-gray-700">
      {coment.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-500">User: Martineluiz775@gmail.com</p>
              <p className="mt-1 truncate text-xs leading-7 text-gray-500">comentario: {person.content}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-400">HOY</p>
          </div>
        </li>
      
      ))}
    </ul>
    </ul>
    </div>
  </main>
</div>
    </div>

    <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>

            </div>
          </div>
        </div>
      </div>


    
  )
}