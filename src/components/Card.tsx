import React from "react";
import type { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  footer,
  children,
  className = "",
}) => {
  return (
    <article className={`card ${className}`.trim()}>
      {title && (
        <header className="card-header">
          <h2 className="card-title">{title}</h2>
        </header>
      )}

      {(content || children) && (
        <div className="card-content">{content || children}</div>
      )}

      {footer && <footer className="card-footer">{footer}</footer>}
    </article>
  );
};
