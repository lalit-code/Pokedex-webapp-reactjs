import React, {useState} from 'react'

export default function SelectType (props){
const[types, updateTypes]= useState([])

  async function typeData (){
    const fullR = await fetch("https://pokeapi.co/api/v2/type/");
    const response = await fullR.json()
    updateTypes(response.results)
  } 
   typeData()
 
 
  const handleType = types.map((val)=>{
    return <option key={val.name} value={val.name}>{val.name}</option>
   })


   const handle=(e)=>{
     props.handleselect(e, types)
   }

  return(

    <div className="form-group">
    <select className="form-control" id="sel1" onChange={(e)=>{handle(e.target.value)}}>
      <option hidden selected>Select</option>
      {handleType}
    </select>
  </div>

  );
}