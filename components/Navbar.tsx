import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <div>
      <header className={`px-5 py-5 font-work-sans shadow-sm bg-white`}>
        <nav className={`flex items-center justify-between`}>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={144} height={144} />
          </Link>
          <div className={`flex items-center gap-5 text-black`}>
            {session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span className="max-sm:hidden">Create</span>
                  <BadgePlus className="sm:hidden size-6" />
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit">
                    <span className="max-sm:hidden">Logout</span>
                    <LogOut className="sm:hidden size-6 text-red-500" />
                  </button>
                </form>

                <Link href={`/user/${session?.id}`}>
                  <Avatar>
                    <AvatarImage className="size-10"
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                  </Avatar>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">
                  <span>Login</span>
                </button>
              </form>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
