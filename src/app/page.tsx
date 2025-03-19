"use client"

import Links from "@/components/home/links";
import { LinkType } from "@/db/schema";
import { useState, useEffect } from "react";
import { getLinks } from "@/actions/crud-links";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react"

function Home() {
    const [links, setLinks] = useState<LinkType[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.id) {
            const userId = parseInt(session.user.id, 10); // Convertir l'ID de l'utilisateur en number
            if (!isNaN(userId)) {
                const getData = async () => {
                    const data = await getLinks(userId);
                    setLinks(data);
                };
                getData();
            }
        }
    }, [session]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-20">
            {session && <Links links={links} />}
        </div>
    );
}

export default function App() {
    return (
        <SessionProvider>
            <Home />
        </SessionProvider>
    );
}
