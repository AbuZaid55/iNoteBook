import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
function Login(props){
    const location = useNavigate();
    let [data,setData]=useState({email:'',password:""})
    let storagedata=JSON.parse(localStorage.getItem("iNoteBookData"))
    function handledata(e){
        let name=e.target.name
        let value = e.target.value.trim()
        setData({...data,[name]:value})
    }
    function submitloginform(e){
        e.preventDefault()
              if(data.email.length!==0){
                if(data.email.search('@gmail.com')!==-1){
                      if(data.password.length!==0){
                        if(data.password.length>=8){ 
                          let allemail = []
                          let allpassword = []
                          if(storagedata!==null){
                              storagedata.map((element)=>{
                                  allemail.push(element.email.trim())
                                  allpassword.push(element.newpass.trim())
                              })
                              if(allemail.indexOf(data.email.trim())>=0){
                                    let userpass = allpassword[allemail.indexOf(data.email.trim())]
                                    if(userpass===data.password){
                                      let userSessionData = {
                                        indexNo:allemail.indexOf(data.email.trim()),
                                        firstname:storagedata[allemail.indexOf(data.email.trim())].firstname,
                                        lastname:storagedata[allemail.indexOf(data.email.trim())].lastname,
                                        email:storagedata[allemail.indexOf(data.email.trim())].email,
                                        phone:storagedata[allemail.indexOf(data.email.trim())].phone,
                                        notes:storagedata[allemail.indexOf(data.email.trim())].notes,
                                      }
                                      sessionStorage.setItem("iNoteBookUserData",JSON.stringify(userSessionData))
                                      setData({email:'',password:""})
                                      props.setsuccess('')
                                      props.seterrors('')
                                      props.setActivenav('')
                                      location('/iNoteBook')
                                    }else{
                                      props.seterrors("Enter Correct Password")
                                      props.setsuccess('')
                                    }
                                    
                                }else{
                                    props.seterrors("Email is Not Exists")
                                    props.setsuccess('')
                                }
                          }else{
                            props.seterrors('Email is Not Exists')
                            props.setsuccess('')
                          }
                        }else{
                          props.seterrors("Password should be greater than or equal to 8 characters")
                          props.setsuccess('')
                        }
                      }else{
                        props.seterrors("Enter Your Password")
                        props.setsuccess('')
                      }
                }else{
                  props.seterrors("Please Enter A Valid Email Address")
                  props.setsuccess('')
                }
              }else{
                props.seterrors("Enter Your Email Address")
                props.setsuccess('')
              }
    }
    return (
        <div className="my-5 m-auto bg-light p-3 rounded-4" style={{width:'70%'}}>
        <h1 className="text-center border-bottom border-3 pb-3 mb-4">User Login</h1>
        <div className="p-2 my-2 border border-danger rounded" id={(sessionStorage.getItem("iNoteBookErrors")==='')?'erros_success':''} style={{color:'red',backgroundColor:'rgba(255, 0, 0, 0.185)'}}> &#x2022; {sessionStorage.getItem("iNoteBookErrors")}</div>
        <div className="p-2 my-2 border border-success rounded" id={(sessionStorage.getItem("iNoteBookSuccess")==='')?'erros_success':''} style={{color:'green',backgroundColor:'rgba(0, 128, 0, 0.185)'}}> &#x2022; {sessionStorage.getItem("iNoteBookSuccess")}</div>
        <form onSubmit={submitloginform}>
            <div className="mb-3">
                <label htmlFor="email1" className="form-label">Enter Your Email</label>
                <input type="email" value={data.email} onChange={handledata} name='email' className="form-control" id="email1" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Enter Your Password</label>
                <input type="text" value={data.password} onChange={handledata} name='password' className="form-control" id="password"/>
            </div>
            <button type="submit" className="btn btn-dark mt-4 mb-2 w-100">Submit</button>
        </form>
        </div>
    )
}
export default Login;