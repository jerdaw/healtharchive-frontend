import { render, screen } from "@testing-library/react";
import { SnapshotFrame } from "@/components/SnapshotFrame";

describe("SnapshotFrame", () => {
  it("renders an iframe with a sandbox attribute", () => {
    render(
      <SnapshotFrame
        src="/api/snapshots/raw/123"
        title="Snapshot Title"
        rawLink="/api/snapshots/raw/123"
        apiLink="/api/snapshot/123"
      />,
    );

    const iframe = screen.getByTitle("Snapshot Title");
    expect(iframe.tagName.toLowerCase()).toBe("iframe");
    expect(iframe).toHaveAttribute(
      "sandbox",
      "allow-same-origin allow-scripts",
    );
  });
});
