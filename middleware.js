import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function middleware(request) {
	const path = request.nextUrl.pathname;
	const token = request.nextauth.token;

	if (path.startsWith("/auth/user") && (token?.account_type === "admin" || token?.account_type === "worker")) {
		return NextResponse.redirect(new URL("/admin", request.url));
	}

	if (path.startsWith("/admin") && token?.account_type === "worker" && !path.startsWith("/admin/orders")) {
		return NextResponse.redirect(new URL("/admin/orders", request.url));
	}

	if (path.startsWith("/api/admin") && (token?.account_type === "admin" || token?.account_type === "worker")) {
		return NextResponse.json({ status: false, message: "authorized" }, { status: 401 });
	}

	if (path.startsWith("/api/admin") && token?.account_type === "worker" && !path.startsWith("/api/admin/order")) {
		return NextResponse.json({ status: false, message: "authorized" }, { status: 401 });
	}
}

export default withAuth(middleware, {
	callbacks: { authorized: ({ token }) => !!token },
});

export const config = {
	matcher: ["/auth/user/:path*", "/admin/:path*"],
};
