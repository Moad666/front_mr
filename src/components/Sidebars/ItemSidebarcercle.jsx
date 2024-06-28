import React, { useState } from "react";


export default function ItemSidebarcercle({img,animated,open}){

    const [imag,setimg]=useState(img);
   
    return <div onClick={() => open()}>
        <img  onMouseEnter={()=>setimg(animated)} onMouseLeave={()=>setimg(img)} src={imag}  style={{borderRadius:"50px",width:"50px", height:"50px"}}/>
    </div>

}