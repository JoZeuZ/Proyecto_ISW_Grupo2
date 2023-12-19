import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/auth.service";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          {...register("email", { required: true })}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        {errors.email && <span className="invalid-feedback">Este campo es obligatorio</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          {...register("password", { required: true })}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        {errors.password && <span className="invalid-feedback">Este campo es obligatorio</span>}
      </div>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default LoginForm;
