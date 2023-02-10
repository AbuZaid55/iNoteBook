import { useState } from "react";

function AddNotes(props){ 
    let [notes , setNotes]=useState('')
    function notesadd(e){
        e.preventDefault()
        let indexno = JSON.parse(sessionStorage.getItem("iNoteBookUserData")).indexNo
        let Notes = JSON.parse(sessionStorage.getItem("iNoteBookUserData")).notes
        Notes.push(notes)
        let storagegetdata = JSON.parse(localStorage.getItem("iNoteBookData"))[indexno]
        storagegetdata.notes=Notes
        let modifystoragegetdata= JSON.parse(localStorage.getItem("iNoteBookData"))
        modifystoragegetdata.splice(indexno,1,storagegetdata)
        let saveData=JSON.stringify(modifystoragegetdata)
        localStorage.setItem("iNoteBookData",saveData)
        let sessionStoragedata = JSON.parse(sessionStorage.getItem("iNoteBookUserData"))
        let previournotesession = sessionStoragedata.notes
        previournotesession.push(notes)
        sessionStoragedata.notes = previournotesession
        let saveSessiondata= JSON.stringify(sessionStoragedata)
        sessionStorage.setItem("iNoteBookUserData",saveSessiondata)


        setNotes('')
        props.setAddnotespage(false)

    }
    return(
        <div id="addnotespage" className=" vh-100 vw-100 position-fixed top-0 let-0 d-flex align-items-center justify-content-center z-3" style={{backgroundColor:'rgb(2 23 43 / 76%)',width:'100%'}}>
        <div  className="w-25">
            <h1 className="text-center text-light bg-dark p-2 m-0 rounded-bottom rounded-5">Type Your Notes</h1>
            <form onSubmit={notesadd} >
            <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="m-0 w-100" name="" id="addtext" cols="60" rows="10"></textarea>
            <button id="savenote" type="submit" className="d-block w-100 p-2 border-0 rounded-top rounded-5  bg-dark text-light" style={{marginTop:'-8px'}} >Save Notes</button>
            </form>
        </div>
        <i id="addnotesClose" onClick={()=>{props.setaddnotespage(false)}} className="fa-regular fa-circle-xmark fs-1 " style={{cursor:'pointer',position:'absolute',top:'100px',right:'100px'}}></i>
    </div>
    )
}
export default AddNotes;