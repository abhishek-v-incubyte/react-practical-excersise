import React, { useState, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode | (() => React.ReactNode);
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  keepMounted?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  className = "",
  orientation = "horizontal",
  keepMounted = false,
}) => {
  const [activeTabId, setActiveTabId] = useState(
    controlledActiveTab || tabs[0]?.id || ""
  );
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTabId(controlledActiveTab);
    }
  }, [controlledActiveTab]);

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;

    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    const enabledIndexes = tabs
      .map((tab, index) => (!tab.disabled ? index : -1))
      .filter((index) => index !== -1);

    const currentEnabledIndex = enabledIndexes.indexOf(currentIndex);
    let nextIndex: number;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex =
          enabledIndexes[(currentEnabledIndex + 1) % enabledIndexes.length];
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex =
          enabledIndexes[
            (currentEnabledIndex - 1 + enabledIndexes.length) %
              enabledIndexes.length
          ];
        break;
      default:
        return;
    }

    const nextTab = tabs[nextIndex];
    if (nextTab && tabRefs.current[nextTab.id]) {
      tabRefs.current[nextTab.id]?.focus();
      handleTabClick(nextTab.id);
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={`tabs-container ${className}`}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={`tabs-list tabs-list--${orientation}`}
        style={{
          display: "flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          gap: "4px",
          borderBottom:
            orientation === "horizontal" ? "1px solid #e0e0e0" : "none",
          borderRight:
            orientation === "vertical" ? "1px solid #e0e0e0" : "none",
          marginBottom: orientation === "horizontal" ? "16px" : "0",
          marginRight: orientation === "vertical" ? "16px" : "0",
          paddingBottom: orientation === "horizontal" ? "0" : undefined,
          paddingRight: orientation === "vertical" ? "16px" : undefined,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTabId;
          const tabPanelId = `tabpanel-${tab.id}`;
          const tabId = `tab-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={tabPanelId}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`tab-button ${isActive ? "tab-button--active" : ""} ${
                tab.disabled ? "tab-button--disabled" : ""
              }`}
              style={{
                padding: "8px 16px",
                border: "none",
                background: isActive ? "#ffffff" : "transparent",
                cursor: tab.disabled ? "not-allowed" : "pointer",
                opacity: tab.disabled ? 0.5 : 1,
                borderBottom:
                  orientation === "horizontal" && isActive
                    ? "2px solid #1976d2"
                    : "none",
                borderRight:
                  orientation === "vertical" && isActive
                    ? "2px solid #1976d2"
                    : "none",
                marginBottom:
                  orientation === "horizontal" && isActive ? "-1px" : "0",
                marginRight:
                  orientation === "vertical" && isActive ? "-1px" : "0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#1976d2" : "#666666",
                transition: "all 0.2s ease",
              }}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div
        className="tabs-panels"
        style={{
          flex: 1,
        }}
      >
        {keepMounted
          ? // Render all panels but hide inactive ones
            tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const tabPanelId = `tabpanel-${tab.id}`;
              const tabId = `tab-${tab.id}`;
              const content =
                typeof tab.content === "function" ? tab.content() : tab.content;

              return (
                <div
                  key={tab.id}
                  id={tabPanelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  hidden={!isActive}
                  style={{
                    display: isActive ? "block" : "none",
                  }}
                  className="tab-panel"
                >
                  {content}
                </div>
              );
            })
          : // Only render active panel
            activeTab && (
              <div
                id={`tabpanel-${activeTab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab.id}`}
                className="tab-panel"
              >
                {typeof activeTab.content === "function"
                  ? activeTab.content()
                  : activeTab.content}
              </div>
            )}
      </div>
    </div>
  );
};
