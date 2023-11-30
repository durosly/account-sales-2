import connectMongo from "@/lib/connectDB";
import { strigifyObj } from "@/lib/utils";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
	session: {
		maxAge: 4 * 60 * 60, // 4 hours

		updateAge: 1 * 60 * 60, // 1 hour
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: "E-mail",
					type: "text",
					placeholder: "jsmith@g.c",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, _) {
				await connectMongo();
				// Add logic here to look up the user from the credentials supplied
				//
				// const { email, password } = credentials
				const user = await UserModel.findOne({
					email: credentials?.email,
				});

				// TODO: check auth type before logging in
				// const user = {
				//     id: '1',
				//     name: 'J Smith',
				//     email: 'jsmith@example.com',
				// };

				if (user) {
					//
					if (!user.is_verified) {
						throw new Error("E-mail is not verified");
					}
					//

					const valid = bcrypt.compareSync(
						credentials?.password || "",
						user.password
					);

					if (!valid) {
						throw new Error("Invalid credentials");
					}
					// Any object returned will be saved in `user` property of the JWT
					const userObj = strigifyObj(user);
					return {
						id: userObj._id,
						name: userObj.name,
						email: userObj.email,
						account_type: userObj.account_type,
					};
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					throw new Error("Invalid credentials");

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.account_type = user.account_type;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.account_type = token.account_type;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth",
		signUp: "/auth",
	},
};
