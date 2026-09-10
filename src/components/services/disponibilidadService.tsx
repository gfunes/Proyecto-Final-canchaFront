export async function obtenerDisponibilidad(canchaId, fecha, signal) {
  // Simulamos un tiempo de carga (ej. 800 milisegundos)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Verificamos si la petición fue cancelada por el usuario
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  // Devolvemos datos falsos (Mock Data)
  return {
    canchaId,
    fecha,
    turnos: [
      { id: 101, horaInicio: "17:00", horaFin: "18:00", estado: "disponible", precio: 20000 },
      { id: 102, horaInicio: "18:00", horaFin: "19:00", estado: "reservado", precio: 25000 },
      { id: 103, horaInicio: "19:00", horaFin: "20:00", estado: "disponible", precio: 25000 },
      { id: 104, horaInicio: "20:00", horaFin: "21:00", estado: "pendiente", precio: 28000 },
      { id: 105, horaInicio: "21:00", horaFin: "22:00", estado: "disponible", precio: 28000 }
    ]
  };
}