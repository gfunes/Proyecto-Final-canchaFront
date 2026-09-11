import type { Cancha } from "../interfaces/canchas";

const urlCanchas = `${import.meta.env.VITE_ALQUILER_CANCHAS}/canchas`;
const urlReservas = `${import.meta.env.VITE_ALQUILER_CANCHAS}/reservas/disponibles`;
const urlCategorias = `${import.meta.env.VITE_ALQUILER_CANCHAS}/categoriaCanchas`;

export const listarCanchasApi = async (): Promise<Response> => {
  try {

    const respuesta = await fetch(urlCanchas);
    return respuesta;
  } catch (error) {
    console.error("Error al listar canchas:", error);
    throw error;
  }
};

export const buscarCanchaApi = async (id: string): Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlCanchas}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(`Error al buscar la cancha con id ${id}:`, error);
    throw error;
  }
};

export const crearCanchaApi = async (cancha: Cancha): Promise<Response> => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const respuesta = await fetch(urlCanchas, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cancha),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al crear la cancha:", error);
    throw error;
  }
};

export const editarCanchaApi = async (
  id: string,
  cancha: Cancha,
): Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlCanchas}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cancha),
    });
    return respuesta;
  } catch (error) {
    console.error(`Error al editar la cancha con id ${id}:`, error);
    throw error;
  }
};

export const borrarCanchaApi = async (id: string): Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlCanchas}/${id}`, {
      method: "DELETE",
     credentials: "include",
     headers: {
        "Content-Type": "application/json",
      },
    });
    return respuesta;
    console.log("Token enviado al borrar:", token);
  } catch (error) {
    console.error(`Error al borrar la cancha con id ${id}:`, error);
    throw error;
  }
};

export const listarReservasApi = async (
  canchaId: string,
  fecha: string,
  signal?: AbortSignal,
): Promise<Response> => {
  try {
    const respuesta = await fetch(
      `${urlReservas}?canchaId=${encodeURIComponent(canchaId)}&fecha=${encodeURIComponent(fecha)}`,
      { signal },
    );
    return respuesta;
  } catch (error: any) {
    // Si fue cancelada intencionalmente por cambio de fecha o StrictMode, no lo imprimimos como error
    if (error.name === "AbortError") {
      throw error;
    }
    console.error("Error al conectar con la API de reservas/turnos:", error);
    throw error;
  }
};
export const listarCategoriasApi = async (): Promise<any[]> => {
  try {
    const respuesta = await fetch(urlCategorias);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al listar categorías:", error);
    return [];
  }
};