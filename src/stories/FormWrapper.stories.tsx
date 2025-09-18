import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FormWrapper } from "../components/FormWrapper";
import { InputField } from "../components/InputField";
import { Checkbox } from "../components/Checkbox";
import { RadioButtonGroup } from "../components/RadioButtonGroup";
import { SelectDropdown } from "../components/SelectDropdown";
import { TextArea } from "../components/TextArea";
import { fn } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof FormWrapper> = {
  title: "Components/FormWrapper",
  component: FormWrapper,
  args: {
    onSubmit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form with submit handler
export const BasicForm: Story = {
  args: {
    title: "Contact Form",
  },
  render: (args) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      const mockData = {
        name: data.get("name"),
        email: data.get("email"),
        timestamp: new Date().toISOString(),
      };
      console.log("Mock form submission:", mockData);
      args.onSubmit?.(e);
    };

    return (
      <FormWrapper {...args} onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </FormWrapper>
    );
  },
};

// Complete form showcasing all components
export const CompleteForm: Story = {
  args: {
    title: "User Registration Form",
  },
  render: (args) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      country: "usa",
      bio: "",
      subscribe: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }

      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }

      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!formData.gender) {
        newErrors.gender = "Please select a gender";
      }

      if (!formData.bio) {
        newErrors.bio = "Bio is required";
      }

      if (!formData.subscribe) {
        newErrors.subscribe = "You must agree to subscribe";
      }

      return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validate();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const mockData = {
          ...formData,
          submittedAt: new Date().toISOString(),
          formId: Math.random().toString(36).substring(7),
        };
        console.log("Mock form submission successful:", mockData);
        setSubmitted(true);
        args.onSubmit?.(e);

        // Reset after successful submission
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            country: "usa",
            bio: "",
            subscribe: false,
          });
        }, 3000);
      } else {
        // Focus on the first invalid field
        const firstErrorField = Object.keys(newErrors)[0];
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.focus();
        }
      }
    };
    return (
      <FormWrapper {...args} onSubmit={handleSubmit}>
        {submitted && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            Form submitted successfully! Check console for mock data.
          </div>
        )}

        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          error={errors.firstName}
          required
        />

        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          error={errors.lastName}
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />

        <RadioButtonGroup
          label="Gender"
          name="gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          error={errors.gender}
          required
        />

        <SelectDropdown
          label="Country"
          name="country"
          options={[
            { value: "usa", label: "United States" },
            { value: "canada", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
            { value: "other", label: "Other" },
          ]}
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          required
        />

        <TextArea
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          error={errors.bio}
          rows={4}
          required
        />

        <Checkbox
          label="I agree to subscribe to the newsletter"
          name="subscribe"
          checked={formData.subscribe}
          onChange={(e) =>
            setFormData({ ...formData, subscribe: e.target.checked })
          }
          error={errors.subscribe}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Submit Form
        </button>
      </FormWrapper>
    );
  },
};

// Form with disabled state
export const DisabledForm: Story = {
  args: {
    title: "Disabled Form Example",
  },
  render: (args) => {
    return (
      <FormWrapper {...args}>
        <InputField
          label="Name"
          name="name"
          type="text"
          disabled
          value="John Doe"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          disabled
          value="john.doe@example.com"
        />
        <SelectDropdown
          label="Country"
          name="country"
          options={[
            { value: "usa", label: "United States" },
            { value: "canada", label: "Canada" },
          ]}
          disabled
          value="usa"
        />
        <RadioButtonGroup
          label="Status"
          name="status"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          value="active"
          disabled
        />
        <TextArea
          label="Notes"
          name="notes"
          disabled
          value="This field is disabled"
        />
        <Checkbox label="Subscribe" name="subscribe" disabled checked={true} />
        <button type="submit" disabled>
          Submit (Disabled)
        </button>
      </FormWrapper>
    );
  },
};

// Form with focus management demonstration
export const WithFocusManagement: Story = {
  args: {
    title: "Form with Focus Management",
  },
  render: (args) => {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.username) {
        newErrors.username = "Username is required";
      }

      if (!formData.email) {
        newErrors.email = "Email is required";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = validate();
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        // Focus on the first invalid field
        const firstErrorField = Object.keys(newErrors)[0];
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.focus();
          console.log(`Focused on first invalid field: ${firstErrorField}`);
        }
      } else {
        console.log("Form is valid! Submitting:", formData);
        args.onSubmit?.(e);
      }
    };

    return (
      <FormWrapper {...args} onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px", color: "#666" }}>
          Try submitting the form without filling any fields. The first invalid
          field will be focused automatically.
        </div>

        <InputField
          label="Username"
          name="username"
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          error={errors.username}
          required
          placeholder="Enter username"
        />

        <InputField
          label="Email"
          name="email"
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
          placeholder="Enter email"
        />

        <InputField
          label="Password"
          name="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
          required
          placeholder="Min 8 characters"
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Submit Form
        </button>
      </FormWrapper>
    );
  },
};
