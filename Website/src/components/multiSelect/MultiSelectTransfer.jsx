import { useState,useEffect,useCallback } from "react";
import "./MultiSelectTransfer.css";

const LIMIT=10

export default function MultiSelectTransfer({LoadData,SelectedList=[],onChange,KeyField="id",LabelField="name",PageSize=LIMIT})
{

    const[availableList,setAvailableList]=useState([])
    const[page,setPage]=useState(1)
    const[total,setTotal]=useState(0)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)
    const totalPages=Math.max(1,Math.ceil(total/PageSize))
    const hasNextPage=page<totalPages
    const loadPage=useCallback(async(currentPage, shouldCancel=()=>false)=>
    {

        try
        {

            setLoading(true)
            setError(null)
            const result=await LoadData({page:currentPage,limit:PageSize})
            if(shouldCancel()) return
            setAvailableList(result.items)
            setTotal(result.total)
            
        }catch(e){

            if(shouldCancel()) return
            setError(e.message)

        }finally{

            if(!shouldCancel()) setLoading(false)

        }

    },[LoadData,PageSize])

    const filteredAvailableList=availableList.filter(item=>!SelectedList.some(selected=>selected[KeyField]===item[KeyField]))
    
    useEffect(()=>
    {
        let cancelled=false
        queueMicrotask(()=>loadPage(page,()=>cancelled))
        return()=>{cancelled=true}
    },[page,loadPage])


    const addItem=(item)=>
    {

        if(SelectedList.some(x=>x[KeyField]===item[KeyField]))return
        const newSelected=[...SelectedList,item]
        onChange?.(newSelected)

    }

    const removeItem=(item)=>
    {

        const newSelected=SelectedList.filter(x=>x[KeyField]!==item[KeyField])
        onChange?.(newSelected)

    }

    return(

        <div className="mst-container">

            <div className="mst-panel">

                <h3>Disponibles</h3>

                <div className="mst-list">

                    {

                        loading&&
                        <div className="mst-empty">

                            Cargando...

                        </div>

                    }

                    {

                        error&&
                        <div className="mst-error">

                            {error}

                        </div>

                    }
                    
                    {

                        !loading&&!error&&filteredAvailableList.map(item=>
                        (

                            <div 

                                key={item[KeyField]}
                                className="mst-item"
                                onClick={()=>addItem(item)}
                                /**title="Click para agregar"*/

                            >

                                {item[LabelField]}
                                
                            </div>

                        ))

                    }

                    {

                        !loading&&!error&&filteredAvailableList.length===0&&
                        <div className="mst-empty">

                            Sin datos

                        </div>

                    }


                </div>

                <div className="mst-pagination">

                    <button 

                        disabled={page===1}
                        onClick={()=>setPage(old=>old-1)}

                    >

                        Anterior

                    </button>

                    <span>

                        {page}/{totalPages||1}

                    </span>

                    <button

                        
                        disabled={!hasNextPage}
                        onClick={()=>setPage(old=>old+1)}

                    >

                        Siguiente

                    </button>

                </div>{/** */}

            </div>

            <div className="mst-panel">

                <h3>Seleccionados</h3>

                <div className="mst-list">

                    {

                        SelectedList.map(item=>
                        (

                            <div 

                                key={item[KeyField]}
                                className="mst-item mst-selected"
                                onClick={()=>removeItem(item)}
                                /**title="Click para quitar"*/

                            >

                                {item[LabelField]}

                            </div>

                        ))

                    }

                    {

                        SelectedList.length===0&&
                        <div className="mst-empty">

                            Sin elementos

                        </div>

                    }

                </div>

            </div>

        </div>

    )

}
