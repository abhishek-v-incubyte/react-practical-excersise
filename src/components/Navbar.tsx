import React, { useState, useRef, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  active?: boolean;
}

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface UserMenu {
  username: string;
  avatar?: string;
  menuItems?: MenuItem[];
}

interface NavbarProps {
  logo: Logo;
  navLinks: NavLink[];
  userMenu: UserMenu;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navLinks,
  userMenu,
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : navLinks.length - 1;
        navLinksRef.current[prevIndex]?.focus();
        break;
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = index < navLinks.length - 1 ? index + 1 : 0;
        navLinksRef.current[nextIndex]?.focus();
        break;
      case "Home":
        e.preventDefault();
        navLinksRef.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        navLinksRef.current[navLinks.length - 1]?.focus();
        break;
    }
  };

  const renderLogo = () => {
    const logoImg = (
      <img src={logo.src} alt={logo.alt} style={{ height: "40px" }} />
    );

    if (logo.href) {
      return (
        <a href={logo.href} style={{ textDecoration: "none" }}>
          {logoImg}
        </a>
      );
    }

    return logoImg;
  };

  return (
    <nav
      className={`navbar ${className}`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Skip Link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "10px",
          zIndex: 999,
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "10px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
        }}
      >
        Skip to main content
      </a>

      {/* Logo */}
      <div className="navbar-logo">{renderLogo()}</div>

      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        style={{
          display: "none",
          background: "none",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <div
        className="navbar-links"
        style={{
          display: isMobileMenuOpen ? "flex" : "flex",
          gap: "20px",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {navLinks.map((link, index) => (
          <a
            key={link.label}
            ref={(el) => {
              if (el) navLinksRef.current[index] = el;
            }}
            href={link.href}
            onClick={(e) => {
              if (link.onClick) {
                e.preventDefault();
                link.onClick(e);
              }
            }}
            aria-current={link.active ? "page" : undefined}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              textDecoration: "none",
              color: link.active ? "#007bff" : "#333",
              fontWeight: link.active ? "600" : "500",
              padding: "5px 10px",
              borderRadius: "4px",
              transition: "background-color 0.2s",
              borderBottom: link.active ? "2px solid #007bff" : "none",
            }}
            onMouseEnter={(e) => {
              if (!link.active) {
                e.currentTarget.style.backgroundColor = "#e9ecef";
              }
            }}
            onMouseLeave={(e) => {
              if (!link.active) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* User Menu */}
      <div
        className="navbar-user-menu"
        style={{ position: "relative" }}
        ref={dropdownRef}
      >
        <button
          onClick={toggleDropdown}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            backgroundColor: "transparent",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e9ecef";
            e.currentTarget.style.borderColor = "#adb5bd";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "#dee2e6";
          }}
        >
          {userMenu.avatar && (
            <img
              src={userMenu.avatar}
              alt={`${userMenu.username} avatar`}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          <span>{userMenu.username}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && userMenu.menuItems && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "4px",
              minWidth: "160px",
              backgroundColor: "white",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            {userMenu.menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsDropdownOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
