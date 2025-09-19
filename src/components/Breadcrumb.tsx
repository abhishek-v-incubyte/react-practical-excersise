import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  lastItemClickable?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/",
  className = "",
  lastItemClickable = false,
}) => {
  if (items.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`} />
    );
  }

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
    // Only make the last item non-clickable if it doesn't have an href
    const isClickable = !isLast || lastItemClickable || item.href !== undefined;
    const hasLink = item.href && isClickable;

    const content = (
      <span
        className={item.className}
        aria-current={
          isLast && !item.href && !lastItemClickable ? "page" : undefined
        }
        style={{
          color:
            hasLink || (item.onClick && isClickable) ? "#007bff" : "#6c757d",
          textDecoration:
            hasLink || (item.onClick && isClickable) ? "underline" : "none",
          cursor:
            hasLink || (item.onClick && isClickable) ? "pointer" : "default",
        }}
      >
        {item.label}
      </span>
    );

    if (hasLink) {
      return (
        <a
          href={item.href}
          onClick={item.onClick}
          className={item.className}
          style={{
            color: "#007bff",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          {item.label}
        </a>
      );
    }

    if (item.onClick && isClickable) {
      return (
        <span
          onClick={item.onClick}
          className={item.className}
          style={{
            color: "#007bff",
            textDecoration: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          {item.label}
        </span>
      );
    }

    return content;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb ${className}`}
      style={{
        padding: "8px 0",
      }}
    >
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {renderItem(item, isLast)}
              {!isLast && (
                <span
                  style={{
                    margin: "0 8px",
                    color: "#6c757d",
                  }}
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
