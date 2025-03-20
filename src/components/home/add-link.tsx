"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addLinkToDb } from "@/actions/crud-links"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

export const formSchema = z.object({
    name: z.string().min(3, {message: "Le nom doit contenir au moins 3 caractères"}).max(25, {message: "Le nom doit contenir au maximum 25 caractères"}),
    urlTo: z.string().url({message: "L'url est invalide"}),
    description: z.string().optional()
})

export default function AddLink() {
    const { data: session } = useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          urlTo: "",
          description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (session?.user?.id) {
            const userId = parseInt(session.user.id, 10); // Convertir l'ID de l'utilisateur en number
            if (!isNaN(userId)) {
                try {
                    await addLinkToDb(values, userId)
                    toast.success("Lien ajouté")
                } catch (error) {
                    toast.error("Erreur lors de l'ajout du lien", {description: "Il se peut que ce nom soit déjà utilisé"})
                    return
                }
                redirect(`/`)
            }
        } else {
            toast.error("Vous devez être connecté pour ajouter un lien")
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center md:w-1/3 mx-auto p-5">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nom du lien :</FormLabel>
                    <FormControl>
                        <Input autoComplete="off" placeholder="nom" {...field} />
                    </FormControl>
                    <FormDescription>
                        Ça sera le nom du lien
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="urlTo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Redirection :</FormLabel>
                    <FormControl>
                        <Input autoComplete="off" placeholder="lien" {...field} />
                    </FormControl>
                    <FormDescription>
                        localhost:3000/[nom] redirigera vers ce lien
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description (facultatif) :</FormLabel>
                    <FormControl>
                        <Input autoComplete="off" placeholder="description" {...field} />
                    </FormControl>
                    <FormDescription>
                        Vous pouvez ajouter une description à votre lien
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Ajouter</Button>
            </form>
            </Form>
        </div>
    )
}