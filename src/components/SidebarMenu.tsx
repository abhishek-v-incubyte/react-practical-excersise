import React, { useState } from "react";

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
            href={item.href}
            onClick={handleClick}
            className={`${isActive ? "active" : ""} ${
              isDisabled ? "disabled" : ""
            } ${item.className || ""}`}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={isDisabled}
            aria-label={item.label}
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
            onClick={handleClick}
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
    <nav
      className={`sidebar-menu ${className}`}
      aria-label={ariaLabel}
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
  );
};
