import React from 'react'
import { Bookmark } from 'lucide-react';


const Card = (props) => {
  
  return (
    <div>
      <div className="card">
        <div className="top">
          <img src={props.logo} alt={props.company} />
          <button>
            <p>Save</p>
            <span><Bookmark size={15} /></span>
            </button>
        </div>

        <div className="center">
          <h3>{props.company} <span>{props.date}</span> </h3>
          <h2>{props.post}</h2>
          <div>
            <h4>{props.work}</h4>
            <h4>{props.level}</h4>
          </div>
        </div>

        <div className="bottom">
          <div>
              <h3>{props.salary}</h3>
              <span>{props.location}</span>
          </div>
            <button>Apply Now</button>
        </div>
        
      </div>
    </div>
  )
}

export default Card
