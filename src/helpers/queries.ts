import type { Cancha } from "../interfaces/canchas";

const urlCanchas = import.meta.env.VITE_ALQUILER_CANCHAS + "/canchas"
const urlCategoriasCanchas = import.meta.env.VITE_ALQUILER_CANCHAS + "/categoriaCanchas"

console.log("URL final:", urlCanchas);

export const listarCanchasApi = async ():Promise<Response> =>{
    try{
        const respuesta = await fetch(urlCanchas)
        return respuesta
        
    }catch(error){
        console.error(error)
        throw error
    }
};

export const buscarCanchaApi = async (id:string):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlCanchas}/${id}`)
        return respuesta
    }catch(error){
        console.error(error)
        throw error
    }
};

export const crearCanchaApi = async (cancha: Cancha):Promise<Response> =>{
    try{
        const respuesta = await fetch(urlCanchas, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cancha)
        })
        return respuesta
    }catch(error){
        console.error(error)
        throw error
    }
};

export const editarCanchaApi = async (id:string, cancha: Cancha):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlCanchas}/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cancha)
        })
        return respuesta
    }catch(error){
        console.error(error)
        throw error
    }
};


export const borrarCanchaApi = async (id:string):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlCanchas}/${id}`, {
            method: 'DELETE'
        })
        return respuesta
    }catch(error){
        console.error(error)
        throw error
    }
};