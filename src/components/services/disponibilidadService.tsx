import { listarReservasApi } from "../../helpers/queries";

  // Verificamos si la petición fue cancelada por el usuario
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
}