"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { deleteLinkOfDb } from "@/actions/crud-links"
import type { LinkType } from "@/db/schema"
import { redirect } from "next/navigation"
import { ChartNoAxesColumn, ExternalLinkIcon, LinkIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"

export default function DetailsCard({ link }: { link: LinkType }) {
  const handleClick = async (id: number) => {
    await deleteLinkOfDb(id)
    toast.error("Lien supprimé")
    redirect("/")
  }

  return (
    <Card className="w-11/12 md:w-1/2 mt-28">
      <CardHeader>
        <CardTitle className="text-4xl">{link.name}</CardTitle>
        <CardDescription className="text-xl">
          {link.description !== "" ? link.description : "Ce lien n'a pas de description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 my-2 md:my-5">
        <div className="space-y-2">
          <p className="text-lg font-medium flex items-center gap-2">
            <LinkIcon className="size-4" />
            <span>Lien raccourci :</span>
          </p>
          <Link
            href={`http://localhost:3000/${link.slug}`}
            className="py-2.5 px-4 border border-muted rounded-lg bg-muted/50 hover:bg-muted duration-150 flex items-center justify-between group w-full"
          >
            <span>{`http://localhost:3000/${link.slug}`}</span>
            <ExternalLinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium flex items-center gap-2">
            <ExternalLinkIcon className="size-4" />
            <span>Redirige vers :</span>
          </p>
          <Link
            href={link.urlTo}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 border border-muted rounded-lg bg-muted/50 hover:bg-muted duration-150 flex items-center justify-between group w-full"
          >
            <span className="truncate">{link.urlTo}</span>
            <ExternalLinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
          </Link>
        </div>

        <div className="mt-4 bg-muted/20 p-4 rounded-lg border border-muted">
          <p className="text-lg font-medium flex items-center gap-2">
            <ChartNoAxesColumn className="size-5" />
            <span>Statistiques :</span>
          </p>
          <p className="mt-2">
            Il y a eu <span className="py-1 px-2 border rounded-lg bg-primary/10 font-semibold">{link.clicked}</span>{" "}
            {link.clicked! <= 1 ? "utilisation" : "utilisations"} de ce lien
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          Retour
        </Button>
        <Button variant="destructive" onClick={() => handleClick(link.id)} className="flex items-center gap-2">
          <TrashIcon className="h-4 w-4" />
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  )
}

