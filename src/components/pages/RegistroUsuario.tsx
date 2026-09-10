import { useForm } from "react-hook-form";

const RegistroUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Función que se ejecuta si todas las validaciones pasan
  const onSubmit = (data) => {
    console.log("Datos del formulario válidos:", data);
    // Aquí puedes enviar los datos a tu backend
  };

  // Función auxiliar para mantener limpios los inputs
  const getInputClass = (hasError) => `
        w-full px-4 py-3 bg-slate-400 border rounded-lg text-zinc-100 
        focus:outline-none focus:ring-2 focus:ring-green-500 transition-all
        ${hasError ? "border-red-500" : "border-zinc-700"}
    `;

  return (
    <section className="flex justify-center">
      <div className="bg-slate-600 w-full max-w-lg rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Únete al Club</h2>
          <p className="text-[#64748B] mt-2">
            Crea tu cuenta para reservar canchas
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">
                Nombre y Apellido(*)
              </label>
              <input
                type="text"
                placeholder="Juan Perez"
                className={getInputClass(errors.nombre)}
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                })}
              />
              {errors.nombre && (
                <span className="text-red-500 text-xs mt-1 italic">
                  {errors.nombre.message}
                </span>
              )}
            </div>
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#64748B] mb-1"
            >
              E-Mail (*)
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={getInputClass(errors.email)}
              placeholder="correo@dominio.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "Email no válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 italic">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-[#64748B] mb-1"
            >
              Teléfono (opcional)
            </label>
            <input
              id="telefono"
              type="tel"
              placeholder="+54 381 4197764"
              className={getInputClass(errors.telefono)}
              {...register("telefono", {
                pattern: {
                  value: /^\+54[-\s]?\d{2,4}[-\s]?\d{6,8}$/,
                  message: "Formato inválido. Ej: +54 381 4197764",
                },
              })}
            />
            {errors.telefono && (
              <span className="text-red-500 text-xs mt-1 italic">
                {errors.telefono.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#64748B] mb-1"
            >
              Contraseña (*)
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={getInputClass(errors.password)}
              placeholder="••••••••"
              {...register("password", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                  message:
                    "Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo.",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 italic">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* Campo de Confirmar Contraseña */}
          <div>
            <label
            htmlFor="password"
              className="block text-sm font-medium text-[#64748B] mb-1"
            >Confirmar Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-slate-400 border rounded-lg text-zinc-100 
        focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              {...register("confirmPassword", {
                required: "Por favor, confirma tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden"
              })}
            />
            {errors.confirmPassword && <p style={{ color: 'red', margin: 0 }}>{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex justify-center items-center"
          >
            Registrarme
          </button>
        </form>


      </div>
    </section>
  );
};

export default RegistroUsuario;
