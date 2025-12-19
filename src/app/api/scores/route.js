import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

// 점수 가져오기 (GET)
export async function GET() {
    try {
        const scores = await prisma.score.findMany({
            take: 50,
            orderBy: {
                attempts: 'asc'
            },
        });
        return NextResponse.json(scores);
    } catch (err) {
        return NextResponse.json({error: '데이터 불러오기 실패'}, {status: 500});
    }
}

// 점수 저장하기 (POST)
export async function POST(request) {
    try {
        const body = await request.json();
        const {name, attempts} = body;
        const newScore = await prisma.score.create({
            data: {
                name,
                attempts
            }
        });
        return NextResponse.json(newScore);
    } catch (err) {
        return NextResponse.json({error: '데이터 저장 실패'}, {status: 500});
    }
}