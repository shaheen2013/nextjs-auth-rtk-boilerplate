import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const configOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please provide your email and password");
        }

        const users = [
          {
            id: 1,
            email: "john@example.com",
            password: "1234",
          },
        ];

        try {
          const user = users.find((u) => u.email === email);

          if (!user) {
            throw new Error("No user found");
          }

          if (user.password !== password) {
            throw new Error("Password incorrect");
          }

          // Return the user object here
          return { id: user.id, email: user.email, name: "John Doe" };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    // Attach the user object to the token
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      // console.log("JWT Callback:", token, user); // Debugging purpose
      return token;
    },

    // Assign the user info from the token to the session
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
        };
      }
      // console.log("Session Callback:", session, token); // Debugging purpose
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(configOptions);

export { handler as GET, handler as POST };
