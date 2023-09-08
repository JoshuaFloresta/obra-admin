"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Artist } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema =z.object({
    name:z.string().min(1),
    imageUrl:z.string().min(1),
});


type ArtistFormValues = z.infer<typeof formSchema>;

interface ArtistFormProps{
    initialData:Artist | null ;
}
export const ArtistForm:React.FC<ArtistFormProps> = ({
    initialData

}) => {

    const params = useParams();
    const router = useRouter();


    const [open,setOpen] = useState(false);
    const [loading,setLoading] =useState(false);

    const title = initialData ? "Edit Artist ": "Create Artist";
    const description = initialData ? "Edit a Artist ": "Add a new Artist";
    const toastMessage = initialData ? "Artist updated ": "Artist Created";
    const action = initialData ? "Save changes ": "Create";


    const form = useForm<ArtistFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData  || {name: '',imageUrl:'',}
    });

    const onSubmit = async (data:ArtistFormValues) => {
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/artist/${params.artistId}`,data);
            }else{
                await axios.post(`/api/${params.storeId}/artist`,data);
            }
            router.refresh();
            router.push(`/${params.storeId}/artist`)
            toast.success(toastMessage);

        } catch(error){
            toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
    }

    const onDelete = async () => {
        try{
            setLoading (true)
            await axios.delete(`/api/${params.storeId}/artist/${params.artistId}`)
            router.refresh();
            router.push(`/${params.storeId}/artist`);
            toast.success("Artist Successfully Deleted.");

        } catch(error){
            toast.error("Make sure to removed all categories using this artist first.");
        } finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return(
        <>
        <AlertModal 
        isOpen={open}
        onClose={()=>setOpen(false)}
        onConfirm={onDelete}
        loading={loading} 
        />

        <div className="flex items-center justify-between">
            <Heading
                title ={title}
                description={description}
            />
            {initialData && (
            <Button disabled={loading} variant="destructive" size="sm" onClick={()=>{setOpen(true)}}>
                <Trash className="h-3 w-3"/>
            </Button>
            )}
        </div>
        <Separator/>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField 
                    control={form.control}
                    name="imageUrl"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Background Image</FormLabel>
                            <FormControl>
                                <ImageUpload 
                                value={field.value ? [field.value] : []}
                                disabled = {loading}
                                onChange={(url) => field.onChange(url)}
                                onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                
                <div className="grid grid-cols-3 gap-8">

                    <FormField 
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Artist Name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    {action}
                </Button>
            </form>
        </Form>
        </>
    );
};

