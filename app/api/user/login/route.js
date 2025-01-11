import { NextResponse } from "next/server"
import { SignJWT } from "jose"  
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"  

export async function POST(request){
    const reqBody = await request.json()
    try{
        await connectDB()
        const savedUserData = await UserModel.findOne({email: reqBody.email}) 
        if(savedUserData){
            // 사용자가 존재할 때의 처리
            if(reqBody.password === savedUserData.password){
                // 비밀번호가 올바를 때의 처리

                const secretKey = new TextEncoder().encode("next-market-app-book") 

                const payload = {
                    email: reqBody.email 
                }

                const token = await new SignJWT(payload)
                                        .setProtectedHeader({alg: "HS256"})
                                        .setExpirationTime("1d")
                                        .sign(secretKey)
                                        
                return NextResponse.json({message: "로그인 성공", token: token})
            }else{
                // 비밀번호가 올바르지 않을 때의 처리
                return NextResponse.json({message: "로그인 실패: 비밀번호가 올바르지 않습니다."})
            }
        }else{
            // 사용자 데이터가 존재하지 않을 때의 처리
            return NextResponse.json({message: "로그인 실패: 사용자를 등록해 주십시오."})
        }
    }catch{
        return NextResponse.json({message: "로그인 실패"}) 
    } 
}