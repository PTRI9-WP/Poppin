import React from 'react'

const Card = () => {
  return (
    <>
    {/* <div className = 'cardContainer'></div> */}
    <div className='flex justify-between'>
      <div className = 'info1'>
        <img src="#" alt="img" />
        <div>place name here </div>
      </div>
      <div className="info2">
        <div>Adress here</div>
        <div>Phone number here</div>
      </div>
      <div className="info3">
        <div>
          Poppin Score
        </div>
        <div>
          stars go here
        </div>
        <div>
          incentive goes here
        </div>
      </div>
      <button>Check In </button>
    </div>
    </>
  )
}

export default Card