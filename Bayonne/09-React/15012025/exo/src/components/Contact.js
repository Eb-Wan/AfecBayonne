import React from 'react'

const Contact = () => {
  return (
    <>
    <main className='p-5'>
        <form className="form-material p-5">
            <div className="form-field">
                <input type="text" id="Nom" className="form-control" />
                <label for="Nom">Nom</label>
            </div>
            <div className="form-field">
                <input type="text" id="Prenom" className="form-control" />
                <label for="Prenom">Prénom</label>
            </div>
            <div className="form-field">
                <input type="email" id="Email" className="form-control" />
                <label for="Email">Email</label>
            </div>
            <div class="form-field">
                <label for="textarea">Message</label>
                <textarea type="text" id="textarea" className="form-control" ></textarea>
            </div>
            <div className="form-field">
                <button className="btn rounded-1 blue btn-press">Envoyer</button>
            </div>
            
        </form>
    </main>
    </>
  )
}

export default Contact