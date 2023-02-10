import {Link,useNavigate} from 'react-router-dom'
function Header(props){
let sessiondata ;
let location = useNavigate()
let s =JSON.parse(sessionStorage.getItem("iNoteBookUserData"))
if(JSON.parse(sessionStorage.getItem("iNoteBookUserData"))===null){
    sessiondata=''
}else{
        sessiondata=JSON.parse(sessionStorage.getItem("iNoteBookUserData")).email
}
function logout(){
let confirm = window.confirm("Are you sure want to Logout?")
if(confirm){
        sessionStorage.removeItem("iNoteBookUserData")
        location("/iNoteBook/login")
        props.setactivenav('/iNoteBook/login')
}else{
}
}
return(
<nav id="" className="navbar navbar-expand-lg bg-body-tertiary bg-dark position-fixed top-0 start-0 w-100 ">
                <div className="container-fluid ">
                <Link className="navbar-brandd d-flex flex-column align-items-center justify-content-center fs-2 mx-3 fw-bold" onClick={()=>{props.setactivenav('')}} to="/iNoteBook/">iNoteBook <span style={{fontSize:'12px',marginTop:'-10px'}}>{(s!==null && s.firstname!==null && s.lastname!==null && s.lastname!==undefined)?s.firstname+' '+s.lastname:''}</span></Link>
                        <button className="navbar-toggler text-light" onClick={()=>{props.setnavbutton(!props.navbutton)}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i className="fa-solid fa-bars" id={props.navbutton?'navbutton-active':''}></i></span>
                        
                        </button>
                        <div className="collapse navbar-collapse " id="navbarNav">
                                <div className="navbar-nav">
                                        {(sessiondata!=='')?
                                                <><Link className="nav-link" id={(props.activenav==='')?'nav-link-active':''} onClick={()=>{props.setactivenav('')}} aria-current="page" to="/iNoteBook/">Home</Link>
                                        <button className='bg-dark border-0 text-light text-start px-0 px-lg-3' onClick={()=>{logout()}}>Log Out</button>
                                        </>:<><Link className="nav-link" id={(props.activenav==='/iNoteBook/login')?'nav-link-active':''} onClick={()=>{props.setactivenav('/iNoteBook/login')}} to="/iNoteBook/login">Login</Link>
                                        <Link className="nav-link" id={(props.activenav==='/iNoteBook/signup')?'nav-link-active':''} onClick={()=>{props.setactivenav('/iNoteBook/signup')}} to="/iNoteBook/signUp">Sign Up</Link></>}
                                </div>
                        </div>
                </div>
        </nav>
)
}
export default Header;