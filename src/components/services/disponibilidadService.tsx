import { listarReservasApi } from "../../helpers/queries";

export async function obtenerDisponibilidad(
  canchaId: string,
  fecha: string,
  signal?: AbortSignal
) {
  try {
    const respuesta = await listarReservasApi(canchaId, fecha, signal);

    if (!respuesta || !respuesta.ok) {
      throw new Error("No se pudieron cargar las reservas de la base de datos.");
    }

    const data = await respuesta.json();
    console.log("Respuesta de la API:", data);

    // 1. Extraemos el objeto de la cancha dentro del array 'canchas'
    const datosCancha = Array.isArray(data?.canchas)
      ? data.canchas[0] || {}
      : Array.isArray(data)
      ? data[0] || {}
      : data || {};

    // 2. Extraemos los turnos disponibles y ocupados
    const disponibles: string[] =
      datosCancha.turnosDisponibles ||
      data.turnosDisponibles ||
      [];

    const ocupados: string[] =
      datosCancha.turnosOcupados ||
      data.turnosOcupados ||
      [];

    const pendientes: string[] =
      datosCancha.turnosPendientes ||
      data.turnosPendientes ||
      [];

    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    // 3. Generamos la grilla completa de 08:00 a 00:00
    //  const horasDelDia: string[] = [
    //   "03:00", "05:00", "10:00", "11:00", "12:00", "13:00",
    //   "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    //   "20:00", "21:00", "22:00", "23:00", "00:00"
    // ];
  const horasDelDia = data.canchas[0].turnosLibres 
  console.log(horasDelDia)
    const calcularHoraFin = (hora: string) => {
      const [h, m] = hora.split(":");
      const siguiente = (parseInt(h, 10) + 1) % 24;
      return `${String(siguiente).padStart(2, "0")}:${m || "00"}`;
    };

    // 4. Mapeamos cada hora asignándole su estado y color
    const turnosCompletos = horasDelDia.map((hora, index) => {
      let estado = "disponible";

      if (ocupados.includes(hora)) {
        estado = "reservado";
      } else if (pendientes.includes(hora)) {
        estado = "pendiente";
      } else if (disponibles.length > 0 && !disponibles.includes(hora)) {
        estado = "reservado";
      }

      return {
        id: `turno-${hora.replace(":", "")}-${index}`,
        horaInicio: hora,
        horaFin: calcularHoraFin(hora),
        estado,
        precio: Number(datosCancha.precio || data.precio) || 20000,
      };
    });

    return {
      canchaId,
      fecha,
      turnos: turnosCompletos,
    };
  } catch (error: any) {
    if (error.name === "AbortError" || signal?.aborted) {
      throw error;
    }
    console.error("Error al cruzar disponibilidad con la base de datos:", error);
    throw error;
  }
}