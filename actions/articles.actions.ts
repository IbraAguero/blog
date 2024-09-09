"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { articleSchema } from "@/schemas/article.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getArticles = async () => {
  try {
    const articles = await db.article.findMany({
      include: {
        user: { select: { name: true } },
        comments: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return articles;
  } catch (error) {
    console.log(error);
  }
};

export const addArticle = async (values: z.infer<typeof articleSchema>) => {
  try {
    const session = await auth();

    const { data, success } = articleSchema.safeParse(values);

    if (!success) {
      return {
        success: false,
        error: "datos invalidos",
      };
    }

    if (!session?.user?.userId) {
      return {
        success: false,
        error: "Usuario no autenticado",
      };
    }

    if (data) {
      const article = await db.article.create({
        data: {
          title: data.title,
          content: data.content,
          userId: session.user.userId,
        },
      });

      revalidatePath("/");
      return { success: true, data: article };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: {} };
  }
};

export const addComment = async (articleId: string, content: string) => {
  try {
    const session = await auth();

    if (!session?.user.userId) {
      return {
        success: false,
        error: "Usuario no autenticado",
      };
    }

    const newComment = await db.comment.create({
      data: {
        content: content,
        articleId: articleId,
        userId: session.user.userId,
      },
      include: {
        user: { select: { name: true } },
      },
    });

    revalidatePath("/");
    return newComment;
  } catch (error) {
    return { success: false, error: error };
  }
};
