import React from 'react'

const Footer = () => {
  return (
    <>
    <div>
      <footer className="d-flex fx-col blue">
        <div className="container">
          <div className="grix xs3">
            <div>
              <h6>Left side of the footer</h6>
              <p>
                This is my phone number<br />
                01 23 45 67 89
              </p>
            </div>
            <div className="text-center">
              <h6>Middle of the footer</h6>
              <p>
                Welcome<br />
                I'm under "Welcome"
              </p>
            </div>
            <div className="text-right">
              <h6>Right side of the footer</h6>
              <p>
                This is my address<br />
                Route 12
              </p>
            </div>
          </div>
        </div>
        <div className="footer fx-center blue dark-1">Copyright © 2024 - Example</div>
      </footer>
    </div>
    </>
  )
}

export default Footer