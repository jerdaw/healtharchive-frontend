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
        baseUrl: "https://www.canada.ca/en/public-health.html",
        description: "PHAC",
        recordCount: 2,
        firstCapture: "2024-01-01",
        lastCapture: "2024-02-01",
        latestRecordId: 10,
        entryRecordId: 9,
        entryBrowseUrl: "https://replay.healtharchive.ca/job-1/https://www.canada.ca/en/public-health.html",
      },
    ]);

    const ui = await BrowseBySourcePage();
    render(ui);

    expect(screen.getByText("PHAC")).toBeInTheDocument();
    expect(screen.getByText(/2 snapshot/i)).toBeInTheDocument();
  });

  it("shows fallback notice when backend fails", async () => {
    mockFetchSources.mockRejectedValue(new Error("API down"));
    const ui = await BrowseBySourcePage();
    render(ui);

    expect(screen.getByText(/Live API unavailable/i)).toBeInTheDocument();
  });
});
