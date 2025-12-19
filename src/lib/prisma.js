// 싱글톤 패턴
// Next.js 개발환경에서 DB 연결이 너무 많이 생겨서 서버가 죽는 것을 막기 위한 설정
import {PrismaClient} from '@prisma/client'

// Next.js 는 파일을 저장할 때마다 코드를 다시 실행, 이때 DB 연결도 계속 새로 만듦
// DB를 반복적으로 새로 만드는 것을 막기 위해 전역 공간에 DB 저장
const globalForPrisma = global;

// 전역변수에 저장된 데이터베이스 내용이 존재하면 사용하고 없으면 생성
export const prisma = globalForPrisma.prisma || new PrismaClient();

// 현재 배포중이 아닌 개발중이라면 방금 만든 DB 연결을 전역 변수에 저장하기
if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
