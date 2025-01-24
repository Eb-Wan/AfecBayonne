import React from 'react'
import { Caroulix } from 'axentix'

const carousel = () => {
  return (
    <>
        <div className="caroulix" id="example-caroulix" data-ax="caroulix" data-caroulix-autoplay-enabled="true" data-caroulix-indicators-enabled="true">
        <div className="caroulix-arrow caroulix-prev">
            <span className="iconify-inline font-s5" data-icon="mdi:chevron-left"></span>
        </div>
        <div className="caroulix-arrow caroulix-next">
            <span className="iconify-inline font-s5" data-icon="mdi:chevron-right"></span>
        </div>
        <div className="caroulix-item">
            <img src="https://picsum.photos/800/450?random=1" alt="img1" />
        </div>
        <div className="caroulix-item">
            <img src="https://picsum.photos/800/450?random=2" alt="img2" />
        </div>
        <div className="caroulix-item">
            <img src="https://picsum.photos/800/450?random=3" alt="img3" />
        </div>
        <div className="caroulix-item">
            <img src="https://picsum.photos/800/450?random=4" alt="img4" />
        </div>
        </div>
    </>
  )
}

export default carousel