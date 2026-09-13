import { useForm, type FieldError } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

interface RegistroFormInputs {
  //nombre: string;
  //apellido?: string;
  nombreUsuario?: string;
  email: string;
  password: string;
  confirmPassword: string;
  //telefono?: string;
}

const RegistroUsuario = () => {
  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistroFormInputs>();

  const passwordValor = watch("password");

  const onSubmit = async (data: RegistroFormInputs) => {
        const datosParaBackend = {
      nombreUsuario: data.nombreUsuario,
      email: data.email,
      password: data.password,
      rol: "cliente", // Enviamos el rol tal cual lo espera Postman
    };

    try {
      const respuesta = await fetch(
        "https://alquiler-cancha-proyecto-final-backend.onrender.com/api/usuarios/registro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosParaBackend),
        }
      );

      const resultado = await respuesta.json();

      if (respuesta.status === 201 || respuesta.ok) {
        Swal.fire({
          title: "Registro exitoso",
          text: "Te enviamos un código de verificación a tu correo.",
          icon: "success",
          background: "#18181b",
          color: "#f4f4f5",
          confirmButtonColor: "#22c55e",
        }).then(() => {
          navegacion("/login");
        });
      } else {
        Swal.fire({
          title: "Error al registrar",
          text: resultado.mensaje || "No se pudo completar el registro",
          icon: "error",
          background: "#18181b",
          color: "#f4f4f5",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error de conexión",
        text: "Hubo un problema al conectar con el servidor",
        icon: "error",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const getInputClass = (hasError?: FieldError) => `
    w-full px-4 py-3 bg-slate-700 border rounded-lg text-zinc-100 
    focus:outline-none focus:ring-2 focus:ring-green-500 transition-all
    ${hasError ? "border-red-500" : "border-zinc-600"}
  `;

  return (
    <section className="flex justify-center py-10 px-4">
      <div className="bg-slate-800 w-full max-w-lg rounded-2xl shadow-xl p-8 border border-zinc-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Únete al Club</h2>
          <p className="text-zinc-400 mt-2">
            Crea tu cuenta para reservar canchas
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Nombre y Apellido (*)
            </label>
            <input
              type="text"
              placeholder="Juan Perez"
              className={getInputClass(errors.nombreUsuario)}
              {...register("nombreUsuario", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
            {errors.nombreUsuario && (
              <span className="text-red-500 text-xs mt-1 italic block">
                {errors.nombreUsuario.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-1"
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
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email no válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 italic block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Teléfono */}
          {/* <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-zinc-300 mb-1"
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
              <span className="text-red-500 text-xs mt-1 italic block">
                {errors.telefono.message}
              </span>
            )}
          </div> */}

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Contraseña (*)
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
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
              <span className="text-red-500 text-xs mt-1 italic block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Confirmar Contraseña (*)
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={getInputClass(errors.confirmPassword)}
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Por favor, confirma tu contraseña",
                validate: (value) =>
                  value === passwordValor || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1 italic block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex justify-center items-center active:scale-95"
          >
            Registrarme
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistroUsuario;