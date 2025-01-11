"use client" 
import { useState } from "react"

const Register = () => {
    const [name, setName] = useState("") 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    name: name,
                    email: email,
                    password: password
                })
            }) 
            const jsonData = await response.json() 
            alert(jsonData.message) 
        }catch{
            alert("사용자 등록 실패") 
        }
    }

    return (
        <div>
            <title>등록 페이지</title>     
            <meta name="description" content="등록 페이지입니다."/>
            <h1 className="page-title">사용자 등록</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="이름" required/> 
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="메일 주소" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="비밀번호" required/>
                <button>등록</button>
            </form> 
        </div>
    )
}

export default Register