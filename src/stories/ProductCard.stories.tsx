import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "../components/ProductCard";

const meta = {
  title: "Components/Cards/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Product name",
    },
    image: {
      control: "text",
      description: "Product image URL",
    },
    alt: {
      control: "text",
      description: "Alt text for product image",
    },
    price: {
      control: "number",
      description: "Regular price",
    },
    salePrice: {
      control: "number",
      description: "Sale price (optional)",
    },
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP"],
      description: "Currency for pricing",
    },
    description: {
      control: "text",
      description: "Product description",
    },
    rating: {
      control: { type: "range", min: 0, max: 5, step: 0.5 },
      description: "Product rating",
    },
    reviewCount: {
      control: "number",
      description: "Number of reviews",
    },
    stock: {
      control: "number",
      description: "Stock quantity",
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    alt: "Black wireless headphones on yellow background",
    price: 199.99,
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life.",
  },
};

export const OnSale: Story = {
  args: {
    title: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    alt: "Modern smart watch",
    price: 299.99,
    salePrice: 199.99,
    description:
      "Track your fitness and stay connected with this feature-packed smartwatch.",
    rating: 4.5,
    reviewCount: 234,
  },
};

export const WithRating: Story = {
  args: {
    title: "Laptop Stand",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    alt: "Aluminum laptop stand",
    price: 49.99,
    description:
      "Ergonomic aluminum laptop stand for better posture and airflow.",
    rating: 4.8,
    reviewCount: 89,
  },
};

export const OutOfStock: Story = {
  args: {
    title: "Vintage Camera",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
    alt: "Vintage film camera",
    price: 450.0,
    description: "Classic 35mm film camera in excellent condition.",
    stock: 0,
  },
};

export const EuroProduct: Story = {
  args: {
    title: "Designer Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    alt: "Leather designer backpack",
    price: 189.99,
    currency: "EUR",
    description: "Handcrafted leather backpack with laptop compartment.",
    rating: 5,
    reviewCount: 42,
  },
};

export const WithActions: Story = {
  args: {
    title: "Coffee Maker",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
    alt: "Modern coffee maker",
    price: 129.99,
    salePrice: 99.99,
    description: "Programmable coffee maker with thermal carafe.",
    rating: 4.3,
    reviewCount: 156,
    footer: (
      <div style={{ display: "flex", gap: "8px", width: "100%" }}>
        <button style={{ flex: 1 }}>Add to Cart</button>
        <button style={{ flex: 1 }}>Buy Now</button>
      </div>
    ),
  },
};

export const MinimalProduct: Story = {
  args: {
    title: "Simple T-Shirt",
    price: 29.99,
  },
};

export const NoImageOutOfStock: Story = {
  args: {
    title: "Sold Out Item",
    price: 99.99,
    description: "This popular item is currently out of stock.",
    stock: 0,
  },
};
