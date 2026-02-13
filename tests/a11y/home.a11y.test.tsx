import { render, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import { expectNoA11yViolations } from "../a11y-helper";
import HomePage from "@/app/[locale]/page";

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe("Home page accessibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have no accessibility violations (English)", { timeout: 10000 }, async () => {
    const ui = await HomePage({ params: Promise.resolve({ locale: "en" }) });
    const { container } = render(ui);

    // Wait for any initial animations/state updates to complete
    await waitFor(() => {
      expect(container.querySelector("h1")).toBeInTheDocument();
    });

    await expectNoA11yViolations(container);
  });

  it("should have no accessibility violations (French)", { timeout: 10000 }, async () => {
    const ui = await HomePage({ params: Promise.resolve({ locale: "fr" }) });
    const { container } = render(ui);

    // Wait for any initial animations/state updates to complete
    await waitFor(() => {
      expect(container.querySelector("h1")).toBeInTheDocument();
    });

    await expectNoA11yViolations(container);
  });

  // Note: Heading hierarchy and skip links are covered by the axe a11y tests above
});
