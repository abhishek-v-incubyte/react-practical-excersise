import React from "react";
import type { ReactNode } from "react";
import { Card } from "./Card";
import "./Card.css";

interface ImageCardProps {
  title?: string;
  image?: string;
  alt?: string;
  content?: ReactNode;
  footer?: ReactNode;
  imagePosition?: "top" | "bottom";
  onImageError?: () => void;
  className?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  title,
  image,
  alt = "",
  content,
  footer,
  imagePosition = "top",
  onImageError,
  className = "",
}) => {
  const imageElement = image ? (
    <img src={image} alt={alt} className="card-image" onError={onImageError} />
  ) : null;

  const cardContent = (
    <>
      {imagePosition === "top" && imageElement}
      {content}
      {imagePosition === "bottom" && imageElement}
    </>
  );

  return (
    <Card
      title={title}
      content={cardContent}
      footer={footer}
      className={`image-card ${
        imagePosition ? `image-${imagePosition}` : ""
      } ${className}`.trim()}
    />
  );
};
