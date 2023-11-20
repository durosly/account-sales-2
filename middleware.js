import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function middleware(request) {
	//
	//
	//
	const path = request.nextUrl.pathname;
	const token = request.nextauth.token;

	if (path.startsWith("/api/admin") && token?.account_type !== "admin") {
		return NextResponse.json({ status: false, message: "authorized" });
	}
}

export default withAuth(middleware, {
	callbacks: { authorized: ({ token }) => !!token },
});

export const config = { matcher: ["/auth/user/:path*", "/admin/:path*"] };
