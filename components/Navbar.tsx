import React from 'react'
import Image from "next/image";
import Link from "next/link";
import {auth, signIn, signOut} from "@/auth";

const Navbar = async () => {

    const session = await auth();

    return (
        <div>
            <header className={`px-5 py-5 font-work-sans bg-white`}>
                  <nav className={`flex items-center justify-between`}>
                      <Link href="/">
                          <Image src="/logo.png" alt="logo" width={144} height={144} />
                      </Link>
                      <div className={`flex items-center gap-5 text-black`}>
                          {session && session?.user ? (
                          <>
                               <Link href="/startup/create">
                                    <span>Create</span>
                               </Link>

                               <form action={ async () => {
                                      "use server";
                                await signOut({redirectTo: '/'});
                               }}>
                                    <button type="submit">
                                        <span>Logout</span>
                                    </button>

                               </form>

                               <Link href={`/user/${session?.user?.name}`}>
                                    <span>{session?.user?.name}</span>
                               </Link>

                          </>) : (
                            <form action={async () => {
                                "use server";
                                await signIn('github')}}>
                                <button type="submit">
                                    <span>Login</span>
                                </button>
                            </form>
                            )
                        }
                      </div>
                  </nav>
            </header>
        </div>
    )
}
export default Navbar
