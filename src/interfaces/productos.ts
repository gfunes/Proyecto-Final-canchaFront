export interface Producto {
  _id: string;
  nombreProducto: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

export type ServicioFormData = Omit<Producto, 'id'>;