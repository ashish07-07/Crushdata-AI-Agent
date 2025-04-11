"use client"
import { useState } from "react"
import axios from "axios";
export default function ()
{    const [input,setinputchange]=useState("")
    return <div>
        <input type="text" onChange={function (e:any)
            {
                  setinputchange(e.target.value);

            }
        } placeholder="Enter the browser command"/>
        <button onClick={function(e:any)
            {
                e.preventDefault();

                const response=axios.post('/api/command',
                    {
                          command:input
                    }
                )

            }
        }>Submit</button>
    </div>
}