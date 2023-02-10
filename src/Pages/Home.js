import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AddNotes from './addnotes.js'
import Login from './Login.js'
function Home(props){
    let location = useNavigate()
    let [addnotespage,setAddnotespage]=useState(false)
    let [deleteNotes,setDeleteNotes]=useState(false)
    let [editsave,setEditsave]=useState()
    let [textareavalue,setTextareavalue]=useState('')
    let sessionData = sessionStorage.getItem("iNoteBookUserData")
    if(sessionData===null){
        return(
            <>
            {location('/iNoteBook/login')}
            <Login>{props.setactivenav('/iNoteBook/login')}</Login>
            </>
        )
    }else{
        let notess = JSON.parse(sessionStorage.getItem("iNoteBookUserData")).notes
        function deletenotes(i){
            let confirm = window.confirm("Are you sure want to delete this notes??")
            if(confirm){
                let localdata = JSON.parse(localStorage.getItem("iNoteBookData"))
                let sessiondata = JSON.parse(sessionStorage.getItem("iNoteBookUserData"))
                let userIndex = sessiondata.indexNo
                localdata[userIndex].notes.splice(i,1)
                let savelocaldata = JSON.stringify(localdata)
                localStorage.setItem("iNoteBookData",savelocaldata)
                sessiondata.notes.splice(i,1)
                let saveSessiondata = JSON.stringify(sessiondata)
                sessionStorage.setItem("iNoteBookUserData",saveSessiondata)
                setDeleteNotes(!deleteNotes)

            }
            }
            function editi(element,i){
                setEditsave(i)
                setTextareavalue(element)
            }
            function savetextarevalue(i){
                setEditsave()
                let sessiondata = JSON.parse(sessionStorage.getItem("iNoteBookUserData"))
                let userIndex = sessiondata.indexNo
                let localdata = JSON.parse(localStorage.getItem("iNoteBookData"))
                localdata[userIndex].notes[i]=textareavalue
                let savelocaldata = JSON.stringify(localdata)
                localStorage.setItem("iNoteBookData",savelocaldata)
                sessiondata.notes[i]=textareavalue
                let savesessiondata = JSON.stringify(sessiondata)
                sessionStorage.setItem("iNoteBookUserData",savesessiondata)
            }
            return(
                <>
                <div className="d-flex align-item-center justify-content-end" style={{marginTop:'80px'}}>
                <div style={{width:'175px'}}>
                    <div id="addnotes" className="bg-black position-fixed  d-flex flew-nowrap rounded-5 mt-3">
                        <i className="fa-solid fa-arrow-right p-3 text-light"></i>
                        <button className="border border-0 bg-transparent p-2 text-nowrap fw-semibold" onClick={()=>{setAddnotespage(true)}}>Add Notes</button>
                    </div>
                </div>
                </div>
                <div id="noteshtml" className=" gap-3 d-flex flex-wrap align-items-center justify-content-center w-100 mt-3" style={{position:'absolute',zIndex:'-10'}}>
                {notess.map((element,i)=>{
                    return <div key={i} style={{height:'300px',width:'300px'}}> 
                    <div className="w-100 text-end bg-dark border rounded-top border-bottom-0 border-dark"><i onClick={()=>{savetextarevalue(i)}} id="savei" className={(editsave===i)?"fa-solid fa-floppy-disk p-2 fs-3":"fa-solid d-none fa-floppy-disk p-2 fs-3"}></i><i id="editi" className={(editsave===i)?"fa-solid d-none fa-file-pen p-2 fs-3":"fa-solid fa-file-pen p-2 fs-3"} onClick={()=>{editi(element,i)}} style={{cursor:'pointer'}}></i><i id="deletenotes" onClick={()=>{deletenotes(i)}} className="fa-solid fa-trash p-2 fs-3 " style={{cursor:'pointer'}}></i></div>
                    <div className="position-relative w-100">
                        <div id="addtext" className="w-100 p-4 z-1 bg-secondary-subtle position-absolute top-0 start-0 border rounded-bottom order-top-0 border-dark" style={{minHeight:'170px',maxHeight:'170px',overflow:'hidden',overflowY:'scroll'}}>{element}</div>
                        <textarea id="textarea" className={(editsave===i)?"w-100 d-block position-absolute top-0 start-0 border rounded-bottom border-top-0 border-dark  bg-light z-2":"w-100 d-none position-absolute top-0 start-0 border rounded-bottom border-top-0 border-dark  bg-light z-2"} style={{minHeight:'170px',height:'170px'}} value={textareavalue} onChange={(e)=>{setTextareavalue(e.target.value)}} cols="30" rows="7"></textarea>

                    </div>
                </div>
                })}
                </div>
                <div className={(addnotespage)?'d-block':'d-none'}><AddNotes addnotespage={addnotespage} setaddnotespage={setAddnotespage} setAddnotespage={setAddnotespage} /></div>
                </>
            )
        }
}
export default Home;