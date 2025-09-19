import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Card } from "../components/Card";
import { ImageCard } from "../components/ImageCard";
import { ProfileCard } from "../components/ProfileCard";
import { ProductCard } from "../components/ProductCard";

expect.extend(toHaveNoViolations);

describe("Card Components Accessibility", () => {
  describe("Card", () => {
    it("should have no accessibility violations with basic props", async () => {
      const { container } = render(
        <Card title="Test Card" content="Card content" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with footer and all props", async () => {
      const { container } = render(
        <Card
          title="Complete Card"
          content="Card content with all props"
          footer={<button>Action</button>}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("ImageCard", () => {
    it("should have no accessibility violations with image", async () => {
      const { container } = render(
        <ImageCard
          title="Image Card"
          image="/test.jpg"
          alt="Descriptive alt text for accessibility"
          content="Content below image"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations without image", async () => {
      const { container } = render(
        <ImageCard title="No Image Card" content="Card without image" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("ProfileCard", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <ProfileCard
          name="John Doe"
          role="Software Engineer"
          bio="Experienced developer"
          avatar="/avatar.jpg"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with social links", async () => {
      const { container } = render(
        <ProfileCard
          name="Jane Smith"
          bio="Designer"
          socialLinks={[
            { platform: "linkedin", url: "https://linkedin.com/jane" },
            { platform: "twitter", url: "https://twitter.com/jane" },
          ]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("ProductCard", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <ProductCard
          title="Test Product"
          price={99.99}
          image="/product.jpg"
          alt="Product image description"
          description="Product description"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with sale price and rating", async () => {
      const { container } = render(
        <ProductCard
          title="Sale Product"
          price={100}
          salePrice={75}
          rating={4.5}
          reviewCount={123}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations when out of stock", async () => {
      const { container } = render(
        <ProductCard
          title="Out of Stock Product"
          price={50}
          stock={0}
          image="/product.jpg"
          alt="Out of stock product"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
