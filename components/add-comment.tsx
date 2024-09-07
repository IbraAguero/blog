"use client";
import { useState } from "react";
import { AccordionContent } from "./ui/accordion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addComment } from "@/actions/articles.actions";

const AddComment = ({ articleId }: { articleId: string }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    await addComment(articleId, newComment);
    setNewComment("");
  };

  return (
    <AccordionContent className="flex gap-2">
      <Input
        placeholder="Escribe un comentario..."
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={handleAddComment}>Enviar</Button>
    </AccordionContent>
  );
};
export default AddComment;
