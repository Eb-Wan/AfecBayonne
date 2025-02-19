import apiClient from "../axiosConfig"
import {useForm} from "react-hook-form"

const Login = ({ isConnected }) => {
  if (isConnected) window.location.replace("/");;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    try {
      await apiClient.post("/api/user/login", data, { withCredentials: true });
      window.location.replace("/");
    } catch (error) {
      const message = (error.response) ? error.response.data.message : error.message;
      setError("response", { message, type: "focus" }, { shouldFocus: true })
    }
  }

  return (
    <>
      <form className="w-75 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Adresse Email</label>
          <input {...register("email", {required: "Ce champ est obligatoire"})} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          {errors.email && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.email.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
          <input {...register("password", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="exampleInputPassword1" />
          {errors.pasword && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password.message}</p>)}
        </div>
        {errors.response && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.response.message}</p>)}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Login