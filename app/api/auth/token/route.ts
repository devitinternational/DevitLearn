import { NextRequest, NextResponse } from "next/server";

function getSessionToken(req: NextRequest) {
  return (
    req.cookies.get("__Secure-authjs.session-token")?.value ??
    req.cookies.get("authjs.session-token")?.value ??
    null
  );
}

export async function GET(req: NextRequest) {
  const token = getSessionToken(req);

  if (!token) {
    return NextResponse.json({ token: null }, { status: 401 });
  }

  return NextResponse.json({ token });
}
