import React from 'react';
import '../Style/Nextprevious.css';

export default function Next(props) {
  
  return (
    <div className="nextprv">
    <div className="btn-div">
              <button type="button" class="btn btn-success" onClick={()=>{props.nextpage()}} >Next</button>   

              <button type="button" class="btn btn-danger" 
                  onClick={()=>{props.prvpage()}} 
                  disabled={props.prevURL===null?true:false}
              >Previous</button>
    </div>
    </div>
  );
}