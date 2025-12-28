import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import SnapshotPage from "@/app/[locale]/snapshot/[id]/page";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const notFoundMock = vi.fn();
vi.mock("next/navigation", () => ({
  notFound: () => notFoundMock(),
}));

vi.mock("@/lib/api", () => ({
  fetchSnapshotDetail: vi.fn(),
  fetchSnapshotLatest: vi.fn(),
  fetchSnapshotTimeline: vi.fn(),
  fetchSourceEditions: vi.fn(),
  resolveReplayUrl: vi.fn(),
  searchSnapshots: vi.fn(),
  getApiBaseUrl: () => "https://api.example.test",
}));

vi.mock("@/data/demo-records", () => ({
  getRecordById: vi.fn().mockReturnValue(null),
}));

vi.mock("@/components/SnapshotFrame", () => ({
  SnapshotFrame: ({
    src,
    title,
    browseLink,
    rawLink,
    apiLink,
  }: {
    src: string;
    title: string;
    browseLink?: string;
    rawLink?: string;
    apiLink?: string;
  }) => (
    <div>
      <div>SnapshotFrame mock: {title}</div>
      <div>src: {src}</div>
      <div>browse: {browseLink}</div>
      <div>raw: {rawLink}</div>
      <div>api: {apiLink}</div>
      <div>Archived content unavailable</div>
      {browseLink && <a href={browseLink}>Open archived page</a>}
      {rawLink && <a href={rawLink}>Open raw HTML</a>}
      {apiLink && <a href={apiLink}>View metadata JSON</a>}
    </div>
  ),
}));

import {
  fetchSnapshotDetail,
  fetchSnapshotLatest,
  fetchSnapshotTimeline,
  fetchSourceEditions,
} from "@/lib/api";
const mockFetchSnapshotDetail = vi.mocked(fetchSnapshotDetail);
const mockFetchSnapshotLatest = vi.mocked(fetchSnapshotLatest);
const mockFetchSnapshotTimeline = vi.mocked(fetchSnapshotTimeline);
const mockFetchSourceEditions = vi.mocked(fetchSourceEditions);

describe("/snapshot/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defaults to browse mode with details collapsed", async () => {
    mockFetchSnapshotDetail.mockResolvedValue({
      id: 45,
      title: "Snapshot Replay",
      sourceCode: "hc",
      sourceName: "Health Canada",
      language: "en",
      captureDate: "2024-01-04",
      captureTimestamp: "2024-01-04T12:34:56+00:00",
      jobId: 1,
      originalUrl: "https://canada.ca/en/health-canada.html",
      snippet: "Summary",
      rawSnapshotUrl: "/api/snapshots/raw/45",
      browseUrl:
        "https://replay.healtharchive.ca/job-1/20240104123456/https://canada.ca/en/health-canada.html",
      mimeType: "text/html",
      statusCode: 200,
    });
    mockFetchSnapshotLatest.mockResolvedValue({
      found: true,
      snapshotId: 46,
      captureTimestamp: "2024-02-02T00:00:00+00:00",
      mimeType: "text/html",
    });
    mockFetchSourceEditions.mockResolvedValue([
      {
        jobId: 1,
        jobName: "legacy-hc-older",
        recordCount: 123,
        firstCapture: "2024-01-01",
        lastCapture: "2024-01-02",
      },
      {
        jobId: 2,
        jobName: "legacy-hc-newer",
        recordCount: 456,
        firstCapture: "2024-02-01",
        lastCapture: "2024-02-02",
      },
    ]);

    const ui = await SnapshotPage({ params: Promise.resolve({ id: "45" }) });
    render(ui);

    expect(screen.getAllByText(/Snapshot Replay/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Health Canada/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Cite/i })).toHaveAttribute("href", "/cite");
    expect(screen.getByRole("button", { name: /Show other snapshots/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View diff/i })).toHaveAttribute(
      "href",
      "/compare-live?to=46&run=1",
    );
  });

  it("opens the details section when view=details", async () => {
    mockFetchSnapshotTimeline.mockResolvedValue({
      sourceCode: null,
      sourceName: null,
      normalizedUrlGroup: null,
      snapshots: [],
    });
    mockFetchSnapshotDetail.mockResolvedValue({
      id: 43,
      title: "Snapshot Error",
      sourceCode: "phac",
      sourceName: "PHAC",
      language: "en",
      captureDate: "2024-01-02",
      captureTimestamp: "2024-01-02T00:00:00+00:00",
      jobId: 1,
      originalUrl: "https://example.com",
      snippet: "Summary",
      rawSnapshotUrl: "/api/snapshots/raw/43",
      browseUrl: null,
      mimeType: "text/html",
      statusCode: 200,
    });
    mockFetchSnapshotLatest.mockResolvedValue({
      found: true,
      snapshotId: 43,
      captureTimestamp: "2025-01-01T00:00:00+00:00",
      mimeType: "text/html",
    });

    const ui = await SnapshotPage({
      params: Promise.resolve({ id: "43" }),
      searchParams: Promise.resolve({ view: "details" }),
    });
    render(ui);

    await waitFor(() => expect(mockFetchSnapshotTimeline).toHaveBeenCalled());
    expect(screen.getAllByText(/Snapshot Error/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Cite/i })).toHaveAttribute("href", "/cite");
    expect(screen.getByRole("button", { name: /other snapshots/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("calls notFound when no snapshot exists", async () => {
    mockFetchSnapshotDetail.mockRejectedValue(new Error("not found"));
    const ui = await SnapshotPage({ params: Promise.resolve({ id: "9999" }) });
    render(ui);
    expect(notFoundMock).toHaveBeenCalled();
  });
});
