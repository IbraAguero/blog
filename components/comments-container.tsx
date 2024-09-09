"use client";
import { Prisma } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback } from "./ui/avatar";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { addComment } from "@/actions/articles.actions";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { toast } from "sonner";

type CommentWithUsername = Prisma.CommentGetPayload<{
  include: { user: { select: { name: true } } };
}>;

const CommentsContainer = ({
  comments,
  articleId,
  session,
}: {
  comments: CommentWithUsername[];
  articleId: string;
  session: Session | null;
}) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);

  useEffect(() => {
    const socket = io("/");

    socket.on("comment", (comment) => {
      setCommentList((prevComments) => [comment, ...prevComments]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAddComment = async () => {
    if (session) {
      const socket = io("/");
      const data = await addComment(articleId, newComment);

      socket.emit("newComment", data);
      setNewComment("");
    } else {
      toast.error("No se pudo agregar", {
        description: "debes iniciar sesion para agregar un comentario",
        richColors: true,
      });
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="1">
        <AccordionTrigger>{`Comentarios (${commentList.length})`}</AccordionTrigger>
        <AccordionContent className="flex gap-2">
          <Input
            value={newComment}
            placeholder="Escribe un comentario..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Enviar</Button>
        </AccordionContent>
        {commentList &&
          commentList.map((comment) => (
            <AccordionContent
              key={comment.id}
              className="flex items-start space-x-2 mb-2"
            >
              <Avatar>
                <AvatarFallback>
                  {comment.user?.name ? comment.user.name[0] : "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">{comment.user?.name}</p>
                <p>{comment.content}</p>
              </div>
            </AccordionContent>
          ))}
      </AccordionItem>
    </Accordion>
  );
};
export default CommentsContainer;
