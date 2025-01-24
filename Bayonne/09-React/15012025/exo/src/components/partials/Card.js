import React from 'react'

const Card = () => {
  return (
    <>
    <div class="card light-shadow-2 white">
        <div class="card-image">
            <img src="https://picsum.photos/800/600?random=1" alt="logo" />
        </div>

        <div class="card-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi suscipit harum repellat architecto unde vel
            numquam rem doloribus maiores deserunt tenetur labore.
        </div>

        <div class="card-footer">
            <button class="btn btn-small primary rounded-1">Action</button>
        </div>
    </div>
    </>
  )
}

export default Card