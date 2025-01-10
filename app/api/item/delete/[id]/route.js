import { NextResponse } from "next/server"
import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"

export async function DELETE(request, context){
    try{
        await connectDB()
        await ItemModel.deleteOne({_id: context.params.id}) 
        return NextResponse.json({message: "아이템 삭제 성공"})
    }catch{
        return NextResponse.json({message: "아이템 삭제 실패"})
    }
}