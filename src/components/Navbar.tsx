import React, { useState, useRef, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div className="navbar-logo">{renderLogo()}</div>

      {/* Navigation Links */}
      <div className="navbar-links" style={{ display: "flex", gap: "20px" }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={link.onClick}
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
              padding: "5px 10px",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
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
