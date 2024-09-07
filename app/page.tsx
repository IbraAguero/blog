import { getArticles } from "@/actions/articles.actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AddComment from "@/components/add-comment";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

/* type ArticleWithUser = Article & {
  user: { name: string | null };
}; */

type ArticleWithComments = Prisma.ArticleGetPayload<{
  include: {
    comments: { include: { user: { select: { name: true } } } };
    user: { select: { name: true } };
  };
}>;

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="flex flex-col items-center">
      <section className="container w-[800px] h-full min-h-[calc(100vh-5rem)] p-10 border-x">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Articulos</h2>
          <Link href="/articulo/agregar" className={buttonVariants()}>
            Agregar articulo
          </Link>
        </div>
        {articles?.map((article: ArticleWithComments) => (
          <Card key={article.id} className="p-4 border rounded-xl">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Por {article.user.name}
              </p>
            </CardHeader>
            <CardContent>
              <p>{article.content}</p>
            </CardContent>
            <CardFooter>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1">
                  <AccordionTrigger>{`Comentarios (${article.comments.length})`}</AccordionTrigger>
                  <AddComment articleId={article.id} />
                  {article.comments &&
                    article.comments.map((comment) => (
                      <AccordionContent
                        key={comment.id}
                        className="flex items-start space-x-2 mb-2"
                      >
                        <Avatar>
                          <AvatarFallback>
                            {comment.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{comment.user.name}</p>
                          <p>{comment.content}</p>
                        </div>
                      </AccordionContent>
                    ))}
                </AccordionItem>
              </Accordion>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
