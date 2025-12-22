import { render, screen } from "@testing-library/react";

import CitePage from "@/app/cite/page";

describe("/cite", () => {
  it("renders citation guidance and a downloadable handout link", () => {
    render(<CitePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "How to cite HealthArchive.ca" }),
    ).toBeInTheDocument();

    const download = screen.getByRole("link", {
      name: "Download citation handout (Markdown)",
    });
    expect(download).toHaveAttribute("href", "/partner-kit/healtharchive-citation.md");

    expect(screen.getByRole("heading", { name: "1) Cite a snapshot" })).toBeInTheDocument();
  });
});
