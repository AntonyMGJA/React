"use client"
import { InsertP, productfind } from "../js"
import { useEffect, useState } from "react"

export default function ProductSearch( {params} ){

    const [Nombre, setNombre] = useState({
        name: "",
        price: 0,
        descripcion: "",
        stock: ""
    })

    const producto = params.id

    useEffect(() => {
        const setData = async()=>{
            const valor = await productfind(producto)
            setNombre(valor)
          }
          
        setData()
      },[])

      console.log(Nombre)

      const [errors, setErrors] = useState({})
      const [isValid, setIsValid] = useState(true)
  
      const validateData = (form) => {
          form.preventDefault()
          let errorList = {}
  
          if (!Nombre.name) {
              errorList.name = "Se necesita un nombre";
          }
          if (!Nombre.descripcion
            ) {
              errorList.description = " Se necesita una descripcion";
          }
          if (!Nombre.price) {
              errorList.price = "Se necesita de un precio";
          }
  
          if (!Nombre.stock) {
              errorList.stock = "Se necesita saber cuantos";
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
              formData.append('id', params.id)
              formData.append('name', Nombre.name);
              formData.append('price', Nombre.price);
              formData.append('descripcion', Nombre.descripcion);
              formData.append('stock', Nombre.stock);
  
              const response = await InsertP(formData);
  
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
              setNombre(data => ({
                  ...data,
                  [name]: value,
              }));
          } else {
              setIsValid(false);
          }
  
      }

      return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8" >
            <h2 className='pt-5 pb-4 text-xl'>Nuevo producto</h2>
            <form onSubmit={validateData}>
                <div className='flex flex-col gap-3 '>
                    <label htmlFor="name"
                    >  Nombre</label>
                    <input type="text" value={Nombre.name} onChange={setValueToState}  name='name' placeholder='product' className={`rounded-md p-2 text-black `}  />

                    <p className='text-rose-600'>{errors.name}</p>
                    <label htmlFor="">
                        Precio
                    </label>

                    <input  type="text" value={Nombre.price} onChange={setValueToState} name='price' placeholder='$00.0' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.price}</p>

                    <label htmlFor="">
                        Descripcion
                    </label>

                    <input type="text" value={Nombre.descripcion} onChange={setValueToState}  name='description' placeholder='lorem ipsum' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.description}</p>

                    <label htmlFor="">
                        stock
                    </label>

                    <input type="text" value={Nombre.stock} onChange={setValueToState}  name='stock' placeholder='lorem ipsum' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.stock}</p>

                    <button type="submit" className='p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800'>Añadir producto</button>

                </div>


            </form>

        </ div>
    )
}