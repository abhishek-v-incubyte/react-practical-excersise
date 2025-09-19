import React, { useState, useRef, useEffect } from "react";

interface MenuItemBase {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

interface LinkMenuItem extends MenuItemBase {
  type?: never;
  href?: string;
  onClick?: (id: string) => void;
  children?: MenuItem[];
  render?: never;
}

interface DividerMenuItem {
  id: string;
  type: "divider";
}

interface GroupMenuItem extends MenuItemBase {
  type: "group";
  children: MenuItem[];
  render?: never;
}

interface CustomMenuItem extends MenuItemBase {
  type?: never;
  render: () => React.ReactNode;
  href?: never;
  onClick?: never;
  children?: never;
}

type MenuItem = LinkMenuItem | DividerMenuItem | GroupMenuItem | CustomMenuItem;

interface SidebarMenuProps {
  items: MenuItem[];
  activeItemId?: string;
  className?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  defaultExpanded?: string[];
  ariaLabel?: string;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  activeItemId,
  className = "",
  collapsible = false,
  collapsed = false,
  onToggleCollapse,
  defaultExpanded,
  ariaLabel,
}) => {
  const menuItemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  // Get all focusable menu items in order
  const getFocusableItems = (): string[] => {
    const focusableIds: string[] = [];

    const collectFocusableItems = (items: MenuItem[]) => {
      items.forEach((item) => {
        if ("type" in item) {
          if (item.type === "group" && item.children) {
            collectFocusableItems(item.children);
          }
          // Skip dividers
        } else if (!("disabled" in item && item.disabled)) {
          focusableIds.push(item.id);
          if (
            "children" in item &&
            item.children &&
            expandedItems.has(item.id)
          ) {
            collectFocusableItems(item.children);
          }
        }
      });
    };

    collectFocusableItems(items);
    return focusableIds;
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    const focusableItems = getFocusableItems();
    const currentIndex = focusableItems.indexOf(itemId);

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          const prevId = focusableItems[currentIndex - 1];
          menuItemRefs.current[prevId]?.focus();
          setFocusedItemId(prevId);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < focusableItems.length - 1) {
          const nextId = focusableItems[currentIndex + 1];
          menuItemRefs.current[nextId]?.focus();
          setFocusedItemId(nextId);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        const item = findItemById(items, itemId);
        if (item && "children" in item && item.children) {
          toggleExpanded(itemId);
        }
        break;
      case "Home":
        e.preventDefault();
        const firstId = focusableItems[0];
        if (firstId) {
          menuItemRefs.current[firstId]?.focus();
          setFocusedItemId(firstId);
        }
        break;
      case "End":
        e.preventDefault();
        const lastId = focusableItems[focusableItems.length - 1];
        if (lastId) {
          menuItemRefs.current[lastId]?.focus();
          setFocusedItemId(lastId);
        }
        break;
    }
  };

  // Helper to find item by ID
  const findItemById = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if ("children" in item && item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  // If defaultExpanded is not provided, auto-expand all items with children
  const getInitialExpanded = () => {
    if (defaultExpanded !== undefined) {
      return new Set(defaultExpanded);
    }
    const expanded = new Set<string>();
    const findItemsWithChildren = (items: MenuItem[]) => {
      items.forEach((item) => {
        if ("children" in item && item.children && item.children.length > 0) {
          expanded.add(item.id);
          findItemsWithChildren(item.children);
        }
      });
    };
    findItemsWithChildren(items);
    return expanded;
  };

  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    getInitialExpanded()
  );

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderMenuItem = (
    item: MenuItem,
    depth: number = 0
  ): React.ReactNode => {
    // Divider
    if ("type" in item && item.type === "divider") {
      return (
        <li
          key={item.id}
          role="separator"
          style={{
            borderTop: "1px solid #e0e0e0",
            margin: "8px 0",
          }}
        />
      );
    }

    // Group
    if ("type" in item && item.type === "group") {
      return (
        <li key={item.id} style={{ paddingTop: depth > 0 ? "8px" : "0" }}>
          <div
            style={{
              padding: "8px 16px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#666",
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {item.children.map((child) => renderMenuItem(child, depth + 1))}
          </ul>
        </li>
      );
    }

    // Custom render
    if ("render" in item && item.render) {
      return (
        <li key={item.id} style={{ padding: "4px 0" }}>
          {item.render()}
        </li>
      );
    }

    const isActive = item.id === activeItemId;
    const hasChildren =
      "children" in item && item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isDisabled = item.disabled;

    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      if (hasChildren && !item.href) {
        e.preventDefault();
        toggleExpanded(item.id);
      }

      if ("onClick" in item && item.onClick) {
        e.preventDefault();
        item.onClick(item.id);
      }
    };

    const itemContent = (
      <>
        {item.icon && (
          <span
            style={{
              marginRight: collapsed ? "0" : "8px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {item.icon}
          </span>
        )}
        <span
          style={{
            flex: 1,
            display: collapsed ? "none" : "block",
          }}
        >
          {item.label}
        </span>
        {hasChildren && !collapsed && (
          <span
            style={{
              marginLeft: "auto",
              transition: "transform 0.2s",
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            ▶
          </span>
        )}
      </>
    );

    const itemStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      padding: `8px ${16 + depth * 16}px`,
      textDecoration: "none",
      color: isActive ? "#007bff" : isDisabled ? "#999" : "#333",
      backgroundColor: isActive ? "#e3f2fd" : "transparent",
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.6 : 1,
      transition: "background-color 0.2s",
      width: "100%",
    };

    const hoverStyle: React.CSSProperties = {
      backgroundColor: isActive ? "#e3f2fd" : "#f5f5f5",
    };

    return (
      <li key={item.id} style={{ padding: 0 }}>
        {"href" in item && item.href && !isDisabled ? (
          <a
            ref={(el) => {
              menuItemRefs.current[item.id] = el;
            }}
            href={item.href}
            onClick={handleClick}
            className={`${isActive ? "active" : ""} ${
              isDisabled ? "disabled" : ""
            } ${item.className || ""}`}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={isDisabled}
            aria-label={item.label}
            tabIndex={
              focusedItemId === item.id || (!focusedItemId && isActive) ? 0 : -1
            }
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            onFocus={() => setFocusedItemId(item.id)}
            style={itemStyle}
            onMouseEnter={(e) => {
              if (!isDisabled) {
                Object.assign(e.currentTarget.style, hoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (!isDisabled) {
                e.currentTarget.style.backgroundColor = isActive
                  ? "#e3f2fd"
                  : "transparent";
              }
            }}
          >
            {itemContent}
          </a>
        ) : (
          <div
            ref={(el) => {
              if (!isDisabled) menuItemRefs.current[item.id] = el;
            }}
            onClick={handleClick}
            tabIndex={
              !isDisabled &&
              (focusedItemId === item.id || (!focusedItemId && isActive))
                ? 0
                : -1
            }
            onKeyDown={(e) => !isDisabled && handleKeyDown(e, item.id)}
            onFocus={() => !isDisabled && setFocusedItemId(item.id)}
            role={hasChildren ? "button" : undefined}
            className={`${isActive ? "active" : ""} ${
              isDisabled ? "disabled" : ""
            } ${item.className || ""}`}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={isDisabled}
            style={itemStyle}
            onMouseEnter={(e) => {
              if (!isDisabled) {
                Object.assign(e.currentTarget.style, hoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (!isDisabled) {
                e.currentTarget.style.backgroundColor = isActive
                  ? "#e3f2fd"
                  : "transparent";
              }
            }}
          >
            {itemContent}
          </div>
        )}
        {hasChildren && isExpanded && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {"children" in item &&
              item.children?.map((child) => renderMenuItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  const sidebarStyle: React.CSSProperties = {
    width: collapsed ? "64px" : "250px",
    backgroundColor: "#f8f9fa",
    height: "100%",
    transition: "width 0.3s ease",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          zIndex: 999,
          padding: "8px",
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "0";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
        }}
      >
        Skip to main content
      </a>

      {/* Mobile styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .sidebar-menu {
              position: fixed !important;
              left: ${collapsed ? "-250px" : "0"};
              top: 0;
              height: 100vh !important;
              z-index: 1000;
              box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            }
            .sidebar-overlay {
              display: ${collapsed ? "none" : "block"};
              position: fixed;
              inset: 0;
              background-color: rgba(0,0,0,0.5);
              z-index: 999;
            }
          }
        `}
      </style>

      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="sidebar-overlay"
          onClick={onToggleCollapse}
          style={{ display: "none" }}
        />
      )}

      <nav
        className={`sidebar-menu ${className}`}
        aria-label={ariaLabel}
        role="navigation"
        style={sidebarStyle}
      >
        {collapsible && (
          <button
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar"
            style={{
              padding: "12px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              textAlign: collapsed ? "center" : "right",
              fontSize: "18px",
            }}
          >
            {collapsed ? "☰" : "✕"}
          </button>
        )}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            flex: 1,
            overflowY: "auto",
          }}
        >
          {items.map((item) => renderMenuItem(item, 0))}
        </ul>
      </nav>
    </>
  );
};
