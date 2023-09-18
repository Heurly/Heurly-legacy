import {NextRequest, NextResponse} from "next/server";
import {ROOT_URL} from "@/config/const";

export async function GET(request: NextRequest) {
    const response = NextResponse.redirect(`${ROOT_URL}/`);
    response.cookies.delete('user');
    return response;
}