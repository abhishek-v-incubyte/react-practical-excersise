import React from "react";
import type { ReactNode } from "react";
import { Card } from "./Card";
import "./Card.css";

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileCardProps {
  name: string;
  avatar?: string;
  role?: string;
  bio: string;
  socialLinks?: SocialLink[];
  footer?: ReactNode;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatar,
  role,
  bio,
  socialLinks,
  footer,
  className = "",
}) => {
  const profileContent = (
    <div className="profile-content">
      {avatar && (
        <div className="profile-avatar">
          <img src={avatar} alt={`${name} avatar`} />
        </div>
      )}
      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        {role && <p className="profile-role">{role}</p>}
        <p className="profile-bio">{bio}</p>
        {socialLinks && socialLinks.length > 0 && (
          <div className="profile-social-links">
            {socialLinks.map((link) => {
              const platformName =
                link.platform === "linkedin"
                  ? "LinkedIn"
                  : link.platform === "twitter"
                  ? "Twitter"
                  : link.platform.charAt(0).toUpperCase() +
                    link.platform.slice(1);
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  aria-label={`${platformName} profile`}
                  className={`social-link social-link-${link.platform}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card
      content={profileContent}
      footer={footer}
      className={`profile-card ${className}`.trim()}
    />
  );
};
