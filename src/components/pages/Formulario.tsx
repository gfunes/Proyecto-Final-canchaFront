import { useForm } from "react-hook-form";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    // setValue,
  } = useForm();

  const onSubmit = () => {
    
  };

  // Clase utilitaria para inputs
  const inputClass = (hasError: boolean) => `
    w-full px-4 py-2.5 bg-zinc-950 border rounded-lg text-zinc-100 
    focus:outline-none focus:ring focus:ring-green-400 transition-all
    ${hasError ? "border-red-500" : "border-zinc-700"}
  `;

  return (
    <section className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-900 shadow-xl my-3">
        <h1 className="text-3xl text-right font-bold text-white mb-8 border-b border-slate-500 pb-4">
            Formulario Productos
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del Servicio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-500 mb-2">
                Nombre del Producto*
              </label>
              <input
                type="text"
                placeholder="Ej: Cancha techada 1"
                className={inputClass(!!errors.nombreServicio)}
                {...register("nombreServicio", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {/* {errors.nombreServicio?.message} */}
              </p>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">
                Precio*
              </label>
              <input
                type="number"
                placeholder="Ej: 50000"
                className={inputClass(!!errors.precio)}
                {...register("precio", {
                  required: "El precio es obligatorio",
                  min: { value: 50, message: "Mínimo $50" },
                  valueAsNumber: true,
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {/* {errors.precio?.message} */}
              </p>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">
                Categoría*
              </label>
              <select
                className={inputClass(!!errors.categoria)}
                {...register("categoria", {
                  required: "Seleccione una categoría",
                })}
              >
                <option value="" className="bg-zinc-900">
                  Seleccione una opción
                </option>
                <option value="Desarrollo Web" className="bg-zinc-900">
                  Cancha
                </option>
                <option value="Backend & API" className="bg-zinc-900">
                  Producto
                </option>
              </select>
              <p className="text-red-500 text-xs mt-1 italic">
                {/* {errors.categoria?.message} */}
              </p>
            </div>

            {/* URL Imagen */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-500 mb-2">
                URL de Imagen*
              </label>
              <input
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                className={inputClass(!!errors.imagen)}
                {...register("imagen", {
                  required: "La URL es obligatoria",
                  pattern: {
                    value: /\.(jpg|jpeg|png|webp|avif|svg)$/,
                    message:
                      "Debe ser una URL de imagen válida (jpg, png, webp, etc.)",
                  },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {/* {errors.imagen?.message} */}
              </p>
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-500 mb-2">
                Descripción*
              </label>
              <textarea
                rows={4}
                placeholder="Describa el Producto detalladamente..."
                className={inputClass(!!errors.descripcion)}
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {/* {errors.descripcion?.message} */}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Formulario;