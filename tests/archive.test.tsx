import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ArchivePage from "@/app/archive/page";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/lib/api", () => ({
  fetchSources: vi.fn(),
  searchSnapshots: vi.fn(),
}));

import { fetchSources, searchSnapshots } from "@/lib/api";
const mockFetchSources = vi.mocked(fetchSources);
const mockSearchSnapshots = vi.mocked(searchSnapshots);

describe("/archive", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders backend search results with pagination", async () => {
    mockFetchSources.mockResolvedValue([
      {
        sourceCode: "phac",
        sourceName: "PHAC",
        recordCount: 2,
        firstCapture: "2024-01-01",
        lastCapture: "2024-01-02",
        topics: ["COVID-19"],
        latestRecordId: 1,
      },
    ]);
    mockSearchSnapshots.mockResolvedValue({
      results: [
        {
          id: 101,
          title: "Test Snapshot",
          sourceCode: "phac",
          sourceName: "PHAC",
          language: "en",
          topics: ["COVID-19"],
          captureDate: "2024-01-02",
          originalUrl: "https://example.com",
          snippet: "Summary",
          rawSnapshotUrl: "/api/snapshots/raw/101",
        },
      ],
      total: 1,
      page: 1,
      pageSize: 10,
    });

    const ui = await ArchivePage({
      searchParams: Promise.resolve({ q: "test", source: "phac", topic: "covid-19" }),
    });
    render(ui);

    expect(screen.getByText(/Search results/i)).toBeInTheDocument();
    expect(screen.getByText("Test Snapshot")).toBeInTheDocument();
    expect(screen.getByText(/1 snapshot/)).toBeInTheDocument();
  });

  it("falls back to demo data when backend search fails", async () => {
    mockFetchSources.mockResolvedValue([]);
    mockSearchSnapshots.mockRejectedValue(new Error("API down"));

    const ui = await ArchivePage({
      searchParams: Promise.resolve({}),
    });
    render(ui);

    expect(
      screen.getByText(/Backend unavailable; showing demo data/i),
    ).toBeInTheDocument();
  });
});
