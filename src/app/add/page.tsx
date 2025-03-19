"use client"

import AddLink from "@/components/home/add-link";
import { SessionProvider } from "next-auth/react";

export default function Add() {
    return (
        <SessionProvider>
            <AddLink />
        </SessionProvider>
    );
}