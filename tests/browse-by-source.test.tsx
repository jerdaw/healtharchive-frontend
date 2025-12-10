import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import BrowseBySourcePage from "@/app/archive/browse-by-source/page";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/lib/api", () => ({
  fetchSources: vi.fn(),
}));

import { fetchSources } from "@/lib/api";
const mockFetchSources = vi.mocked(fetchSources);

describe("/archive/browse-by-source", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders backend source summaries", async () => {
    mockFetchSources.mockResolvedValue([
      {
        sourceCode: "phac",
        sourceName: "PHAC",
        recordCount: 2,
        firstCapture: "2024-01-01",
        lastCapture: "2024-02-01",
        topics: [
          { slug: "covid-19", label: "COVID-19" },
          { slug: "influenza", label: "Influenza" },
        ],
        latestRecordId: 10,
      },
    ]);

    const ui = await BrowseBySourcePage();
    render(ui);

    expect(screen.getByText("PHAC")).toBeInTheDocument();
    expect(screen.getByText(/2 snapshot/i)).toBeInTheDocument();
    // Topic labels from TopicRef[] should render as badges.
    expect(screen.getByText("COVID-19")).toBeInTheDocument();
    expect(screen.getByText("Influenza")).toBeInTheDocument();
  });

  it("shows fallback notice when backend fails", async () => {
    mockFetchSources.mockRejectedValue(new Error("API down"));
    const ui = await BrowseBySourcePage();
    render(ui);

    expect(screen.getByText(/Backend unavailable/i)).toBeInTheDocument();
  });
});
