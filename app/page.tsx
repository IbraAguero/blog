import { getArticles } from "@/actions/articles.actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import CommentsContainer from "@/components/comments-container";
import { auth } from "@/auth";

type ArticleWithComments = Prisma.ArticleGetPayload<{
  include: {
    comments: { include: { user: { select: { name: true } } } };
    user: { select: { name: true } };
  };
}>;

export default async function Home() {
  const articles = await getArticles();
  const session = await auth();

  return (
    <main className="flex flex-col items-center">
      <section className="container h-full min-h-[calc(100vh-5rem)] p-10 border-x">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Articulos</h2>
          {session && (
            <Link href="/articulo/agregar" className={buttonVariants()}>
              Agregar articulo
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {articles?.map((article: ArticleWithComments) => (
            <Card key={article.id} className="p-4 border rounded-xl">
              <CardHeader className="flex flex-row justify-between items-baseline">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {article.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Por {article.user.name}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p>{article.content}</p>
              </CardContent>
              <CardFooter>
                <CommentsContainer
                  session={session}
                  comments={article.comments}
                  articleId={article.id}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
