import {NextRequest, NextResponse} from 'next/server'
import { db } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    
    try {
        
        const videos = await db.orm.public.Video.orderBy((v) => v.createdAt.desc()).all()
        
        return NextResponse.json(videos)
        
    } catch (error) {
        
        return NextResponse.json({error: "Error fetching videos"}, {status: 500})
        
    }
    //  finally {
    //     await db.close()
    // }
    
}