import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
function SignUp(props){
    const location = useNavigate();
    let [data,setData]=useState({firstname:'',lastname:'',email:'',phone:'',newpass:'',confirmpass:'',notes:[]})
    let storagedata=JSON.parse(localStorage.getItem("iNoteBookData"))
    function handledata(e){
        let name=e.target.name
        let value = e.target.value.trim()
        setData({...data,[name]:value})
    }
    let allemail = []
    if(storagedata!==null){
        storagedata.map((element)=>{
            allemail.push(element.email.trim())
        })
    }
    
    function submitsignform(e){
        e.preventDefault()
        if(data.firstname.length!==0){
            if(data.firstname.length>=3){
              if(data.email.length!==0){
                if(data.email.search('@gmail.com')!==-1){
                  if(data.phone.length!==0){
                    if(data.phone.length===10){
                      if(data.newpass.length!==0){
                        if(data.newpass.length>=8){
                          if(data.confirmpass.length!==0){
                            if(data.newpass===data.confirmpass){ 
                                if(allemail.indexOf(data.email.trim())===-1){
                                      if(storagedata!==null){
                                        storagedata.push(data)
                                        let saveData=JSON.stringify(storagedata)
                                        localStorage.setItem("iNoteBookData",saveData)
                                        setData({firstname:'',lastname:'',email:'',phone:'',newpass:'',confirmpass:'',notes:[]})
                                        props.setsuccess('Congratulations! You have successfully registered')
                                        props.seterrors('')
                                        props.setActivenav('/iNoteBook/login')
                                        location('/iNoteBook/login')
                                      }else{
                                        let dataa = [data]
                                        let saveData=JSON.stringify(dataa)
                                        localStorage.setItem("iNoteBookData",saveData)
                                        setData({firstname:'',lastname:'',email:'',phone:'',newpass:'',confirmpass:'',notes:[]})
                                        props.setsuccess('Congratulations! You have successfully registered')
                                        props.seterrors('')
                                        props.setActivenav('/iNoteBook/login')
                                        location('/iNoteBook/login')
                                      }
                                }else{
                                    props.seterrors("Email Already Exists")
                                    props.setsuccess('')
                                }
                            }else{
                                props.seterrors("Confirm password doesn't match")
                                props.setsuccess('')
                            }
                          }else{
                            props.seterrors("Enter Your Confirm password")
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
                      props.seterrors("Phone No should be 10 characters")
                      props.setsuccess('')
                    }
                  }else{
                    props.seterrors("Enter Your Phone No")
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
            }else{
              props.seterrors('First Name should be greater than or equal to 3 characters')
              props.setsuccess('')
            }
          }else{
            props.seterrors("Enter Your FirstName")
            props.setsuccess('')
          }

    }
    return (
        <div className="my-5 m-auto bg-light p-3 rounded-4" style={{width:'70%'}}>
        <h1 className="text-center border-bottom border-3 pb-3 mb-4">New User Registration</h1>
        <div className="p-2 my-2 border border-danger rounded" id={(sessionStorage.getItem("iNoteBookErrors")==='')?'erros_success':''} style={{color:'red',backgroundColor:'rgba(255, 0, 0, 0.185)'}}> &#x2022; {sessionStorage.getItem("iNoteBookErrors")}</div>
        <div className="p-2 my-2 border border-success rounded" id={(sessionStorage.getItem("iNoteBookSuccess")==='')?'erros_success':''} style={{color:'green',backgroundColor:'rgba(0, 128, 0, 0.185)'}}> &#x2022; {sessionStorage.getItem("iNoteBookSuccess")}</div>
        <form onSubmit={submitsignform} >
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">Enter Your First Name</label>
                <input type="text" value={data.firstname} onChange={handledata} name='firstname' className="form-control" id="firstname"/>
            </div>
            <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Enter Your Last Name</label>
                <input type="text" value={data.lastname} onChange={handledata} name='lastname' className="form-control" id="lastname" />
            </div>
            <div className="mb-3">
                <label htmlFor="email1" className="form-label">Enter Your Email Address</label>
                <input type="email" value={data.email} onChange={handledata} name='email' className="form-control" id="email1" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Enter Your Phone No</label>
                <input type="number" value={data.phone} onChange={handledata} name='phone' className="form-control" id="phone"/>
            </div>
            <div className="mb-3">
                <label htmlFor="newpassword" className="form-label">Enter New Password</label>
                <input type="text" value={data.newpass} onChange={handledata} name='newpass' className="form-control" id="newpassword"/>
            </div>
            <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">Enter Confirm Password</label>
                <input type="text" value={data.confirmpass} onChange={handledata} name='confirmpass' className="form-control" id="confirmpassword"/>
            </div>
            <button type="submit" className="btn btn-dark mt-4 mb-2 w-100">Submit</button>
        </form>
        </div>
    )
}
export default SignUp;