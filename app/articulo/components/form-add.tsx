"use client";
import { addArticle } from "@/actions/articles.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { articleSchema } from "@/schemas/article.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormAddArticle = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof articleSchema>>({
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = async (values: z.infer<typeof articleSchema>) => {
    const response = await addArticle(values);

    if (response?.success) {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full h-full flex flex-col justify-between"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="ingrese su titulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="resize-none"
                  placeholder="ingrese el contenido de su articulo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  );
};
export default FormAddArticle;
