"use client"
import React, { useState } from 'react'
//import  SendData  from "../../../accions/setproduct";
import {InsertP} from "./action"
import { createClient } from '@supabase/supabase-js'



const SaveProduct = () => {
    // interface Product {
    //     name: string;
    //     price: number;
    //     description: string;
    //     categorie: string;
    //     image: string;
    // }

    const supabase = createClient('https://hobfffojtyjkzcpvsssy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvYmZmZm9qdHlqa3pjcHZzc3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNzk4MjcsImV4cCI6MjAyMjg1NTgyN30.ZxTKYfzWYtsSxJkvgENZigMAtn2LiBznu0gHdPLMyrQy')


    const [errors, setErrors] = useState({})
    const [isValid, setIsValid] = useState(true)
    const [productData, setProductData] = useState({
        name: "",
        price: 0,
        description: "",
       stock: ""

    })





    // interface errorShow{
    //     name:string,
    //     description:string,
    //     price:string,
    // }

    const validateData = (form) => {
        form.preventDefault()
        let errorList = {}

        if (!productData.name) {
            errorList.name = "Se necesita un nombre";

        }
        if (!productData.description) {
            errorList.description = " Se necesita una descripcion";
        }

        if (!productData.price) {
            errorList.price = " Se necesita una descripcion";
        }
        if (!productData.stock) {
            errorList.stock = " Se necesita una descripcion";
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
            formData.append('name', productData.name);
            formData.append('price', productData.price);
            formData.append('descripcion', productData.description);
            formData.append('stock', productData.stock);

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
            setProductData(data => ({
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
                    <input type="text" value={productData.name} onChange={setValueToState}  name='name' placeholder='product' className={`rounded-md p-2 text-black `}  />

                    <p className='text-rose-600'>{errors.name}</p>
                    <label htmlFor="">
                        Precio
                    </label>

                    <input  type="text" value={productData.price} onChange={setValueToState} name='price' placeholder='$00.0' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.price}</p>

                    <label htmlFor="">
                        Descripcion
                    </label>

                    <input type="text" value={productData.description} onChange={setValueToState}  name='description' placeholder='lorem ipsum' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.description}</p>

                    <label htmlFor="">
                        stock
                    </label>

                    <input type="text" value={productData.stock} onChange={setValueToState}  name='stock' placeholder='lorem ipsum' className='rounded-md p-2 text-black'  />

                    <p className='text-rose-600'>{errors.stock}</p>

                    <button type="submit" className='p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800'>Añadir producto</button>

                </div>


            </form>

        </ div>
    )
}


export default SaveProduct;