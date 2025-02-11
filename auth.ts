import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { AUHTOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({
      user: { name, image, email },
      profile,
    }) {
      const exisitingUser = await client.withConfig({useCdn: false}).fetch(AUHTOR_BY_GITHUB_ID_QUERY, {
        id: profile?.id,
      });

      if (!exisitingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          bio: profile?.bio || "",
          image,
          email,
        });
      }

      return true;
    },
    async jwt({token, account, profile}) {
        if(account && profile) {
            const user = await client.withConfig({useCdn: false}).fetch(AUHTOR_BY_GITHUB_ID_QUERY, {id: profile?.id})

            token.id = user?._id
        }

        return token;
    },

    async session({session, token}) {
        Object.assign(session, {id: token.id})

        return session;
    }
  },
});
