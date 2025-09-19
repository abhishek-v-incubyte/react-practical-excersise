import React, { useRef } from "react";

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
  maxItemsToShow?: number; // For responsive design
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/",
  className = "",
  lastItemClickable = false,
  maxItemsToShow = 0, // 0 means show all
}) => {
  const itemRefs = useRef<(HTMLAnchorElement | HTMLSpanElement | null)[]>([]);

  if (items.length === 0) {
    return (
      <nav
        role="navigation"
        aria-label="Breadcrumb"
        className={`breadcrumb ${className}`}
      />
    );
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const focusableItems = itemRefs.current.filter(
      (item) => item && !item.getAttribute("aria-current")
    );
    const currentIndex = focusableItems.indexOf(itemRefs.current[index]);

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        if (currentIndex > 0) {
          focusableItems[currentIndex - 1]?.focus();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (currentIndex < focusableItems.length - 1) {
          focusableItems[currentIndex + 1]?.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        focusableItems[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        focusableItems[focusableItems.length - 1]?.focus();
        break;
    }
  };

  // Determine which items to show based on responsive design
  const getItemsToRender = () => {
    if (maxItemsToShow === 0 || items.length <= maxItemsToShow) {
      return items;
    }

    // Show first item, ellipsis, and last (maxItemsToShow - 2) items
    if (maxItemsToShow < 3) {
      return items.slice(-maxItemsToShow);
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(maxItemsToShow - 2));
    return [firstItem, { label: "...", isEllipsis: true }, ...lastItems];
  };

  const renderItem = (
    item: BreadcrumbItem & { isEllipsis?: boolean },
    isLast: boolean,
    index: number
  ) => {
    // Handle ellipsis item
    if (item.isEllipsis) {
      return (
        <span
          style={{
            color: "#6c757d",
            cursor: "default",
            padding: "0 8px",
          }}
          aria-label="More items"
        >
          {item.label}
        </span>
      );
    }

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
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          href={item.href}
          onClick={item.onClick}
          className={item.className}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, index)}
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
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          onClick={item.onClick}
          className={item.className}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, index)}
          role="button"
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

  const itemsToRender = getItemsToRender();

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .breadcrumb ol {
              gap: 4px !important;
            }
            .breadcrumb li {
              font-size: 14px;
            }
          }
        `}
      </style>
      <nav
        role="navigation"
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
            gap: "8px",
          }}
        >
          {itemsToRender.map((item, index) => {
            const isLast = index === itemsToRender.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {renderItem(
                  item as BreadcrumbItem & { isEllipsis?: boolean },
                  isLast,
                  index
                )}
                {!isLast && (
                  <span
                    style={{
                      margin: "0 0 0 8px",
                      color: "#6c757d",
                    }}
                    aria-hidden="true"
                  >
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
