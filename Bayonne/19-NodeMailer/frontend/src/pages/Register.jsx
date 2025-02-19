import apiClient from "../axiosConfig"
import {useForm} from "react-hook-form"

const Register = ({ isConnected }) => {
  if (isConnected) window.location.replace("/");;
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    if (data.password !== data.password2) setError("password", { message: "Les mots de passe sont différents", type: "focus" }, { shouldFocus: true })
    else {
      try {
        await apiClient.post("/api/user/register", data, { withCredentials: true });
        window.location.replace("/");
      } catch (error) {
        const message = (error.response) ? error.response.data.message : error.message;
        setError("response", { message, type: "focus" }, { shouldFocus: true })
      }
    }
  }

  return (
    <>
      <form className="w-75 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
          <label htmlFor="nameinput" className="form-label">Nom</label>
          <input {...register("name", {required: "Ce champ est obligatoire"})} type="text" className="form-control" id="nameinput" />
          {errors.name && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Adresse Email</label>
          <input {...register("email", {required: "Ce champ est obligatoire"})} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          {errors.email && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.email.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordinput" className="form-label">Mot de passe</label>
          <input {...register("password", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="passwordinput" />
          {errors.pasword && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password.message}</p>)}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordinput2" className="form-label">Répétez le mot de passe</label>
          <input {...register("password2", {required: "Ce champ est obligatoire"})} type="password" className="form-control" id="passwordinput2" />
          {errors.pasword2 && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.password2.message}</p>)}
        </div>
        {errors.response && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.response.message}</p>)}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Register