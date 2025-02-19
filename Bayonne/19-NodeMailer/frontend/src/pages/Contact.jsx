import apiClient from "../axiosConfig"
import {useForm} from "react-hook-form"

const Contact = ({ isConnected, isVerified }) => {
  if (!isConnected || !isVerified) window.location.replace("/");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    try {
      await apiClient.post("/api/contact/", data, { withCredentials: true });
      setError("success", { message: "Message envoyé", type: "focus" }, { shouldFocus: true })
    } catch (error) {
      const message = (error.response) ? error.response.data.message : error.message;
      setError("response", { message, type: "focus" }, { shouldFocus: true })
    }
  }

  return (
    <>
      <form className="w-75 mx-auto my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
          <textarea {...register("contact", {required: "Ce champ est obligatoire", maxLength: { value: 255, message: "Le message est trop long" }})} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
          <label htmlFor="floatingTextarea2">Message</label>
          {errors.contact && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.contact.message}</p>)}
        </div>
        {errors.response && (<p className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">{errors.response.message}</p>)}
        {errors.success && (<p className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">{errors.success.message}</p>)}


        <button type="submit" className="btn btn-primary">Envoyer</button>
      </form>
    </>
  )
}

export default Contact