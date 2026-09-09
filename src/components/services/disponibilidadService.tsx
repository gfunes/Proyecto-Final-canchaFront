import { listarReservasApi } from "../../helpers/queries"; // Ajusta esta ruta según tus carpetas

export async function obtenerDisponibilidad(canchaId: string, fecha: string, signal?: AbortSignal) {
  try {
    // 1. Llamamos a tu API de reservas
    const respuesta = await listarReservasApi();
    
    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar las reservas de la base de datos.");
    }
    
    const reservasBD = await respuesta.json();

    // 2. Verificamos si el usuario cambió de pestaña/fecha rápidamente y abortó la petición
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    // 3. Filtramos las reservas para quedarnos solo con las de esta cancha y fecha
    // Usamos String() y startsWith() para evitar errores por tipos de datos (ej. ObjectId de Mongo) o fechas ISO.
    const reservasDelDia = reservasBD.filter((reserva: any) => 
      String(reserva.canchaId) === String(canchaId) && 
      String(reserva.fecha).startsWith(fecha)
    );

    // 4. Generamos la grilla base de horarios (ajusta estos horarios a la realidad de tu complejo)
    const horariosFijos = [
      { horaInicio: "17:00", horaFin: "18:00", precio: 20000 },
      { horaInicio: "18:00", horaFin: "19:00", precio: 25000 },
      { horaInicio: "19:00", horaFin: "20:00", precio: 25000 },
      { horaInicio: "20:00", horaFin: "21:00", precio: 28000 },
      { horaInicio: "21:00", horaFin: "22:00", precio: 28000 }
    ];

    // 5. Cruzamos los horarios fijos con las reservas traídas de la API
    const turnosCompletos = horariosFijos.map((horario, index) => {
      
      // Buscamos si existe alguna reserva en la BD para esta hora de inicio específica
      const reservaEncontrada = reservasDelDia.find(
        (reserva: any) => reserva.horaInicio === horario.horaInicio
      );

      if (reservaEncontrada) {
        // Si el turno existe en la base de datos, lo retornamos como "reservado" o "pendiente"
        return {
          id: reservaEncontrada._id || reservaEncontrada.id, // Usa el ID real de la base de datos
          horaInicio: horario.horaInicio,
          horaFin: horario.horaFin,
          estado: reservaEncontrada.estado || "reservado", 
          precio: reservaEncontrada.precio || horario.precio
        };
      }

      // Si el turno no está en la base de datos, está libre para el usuario
      return {
        id: `disponible-${index}`, // Generamos un ID temporal para React
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
        estado: "disponible",
        precio: horario.precio
      };
    });

    return {
      canchaId,
      fecha,
      turnos: turnosCompletos
    };

  } catch (error) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    console.error("Error al cruzar disponibilidad con la base de datos:", error);
    throw error;
  }
}