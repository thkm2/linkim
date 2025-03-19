import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Assurez-vous que l'ID de l'utilisateur est inclus dans la session
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            // Ajoutez l'ID de l'utilisateur au token JWT
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
});