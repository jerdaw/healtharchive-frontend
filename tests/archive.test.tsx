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
        baseUrl: "https://www.canada.ca/en/public-health.html",
        description: "PHAC",
        recordCount: 2,
        firstCapture: "2024-01-01",
        lastCapture: "2024-01-02",
        latestRecordId: 1,
        entryRecordId: 1,
        entryBrowseUrl: null,
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
          captureDate: "2024-01-02",
          captureTimestamp: null,
          jobId: null,
          originalUrl: "https://example.com",
          snippet: "Summary",
          rawSnapshotUrl: "/api/snapshots/raw/101",
          browseUrl: null,
        },
      ],
      total: 1,
      page: 1,
      pageSize: 10,
    });

    const ui = await ArchivePage({
      searchParams: Promise.resolve({ q: "test", source: "phac" }),
    });
    render(ui);

    expect(screen.getByText(/Search results/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /test snapshot/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/1 snapshot/)).toBeInTheDocument();
  });

  it("passes source through to backend search", async () => {
    mockFetchSources.mockResolvedValue([
      {
        sourceCode: "phac",
        sourceName: "PHAC",
        baseUrl: "https://www.canada.ca/en/public-health.html",
        description: "PHAC",
        recordCount: 1,
        firstCapture: "2024-01-01",
        lastCapture: "2024-01-01",
        latestRecordId: 1,
        entryRecordId: 1,
        entryBrowseUrl: null,
      },
    ]);
    mockSearchSnapshots.mockResolvedValue({
      results: [],
      total: 0,
      page: 1,
      pageSize: 10,
    });

    const ui = await ArchivePage({
      searchParams: Promise.resolve({ source: "phac" }),
    });
    render(ui);

    expect(mockSearchSnapshots).toHaveBeenCalledTimes(1);
    const args = mockSearchSnapshots.mock.calls[0][0];
    expect(args.source).toBe("phac");
  });

  it("falls back to offline sample when backend search fails", async () => {
    mockFetchSources.mockRejectedValue(new Error("API down"));
    mockSearchSnapshots.mockRejectedValue(new Error("API down"));

    const ui = await ArchivePage({
      searchParams: Promise.resolve({ q: "naloxone" }),
    });
    render(ui);

    expect(
      screen.getByText(/Live API unavailable; showing a limited offline sample/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Information for Canadians/i }),
    ).toBeInTheDocument();
  });
});
