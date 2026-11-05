import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StartupSplash } from "./StartupSplash";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Opening logo lifecycle", () => {
  it("dismisses immediately when fonts are ready without an artificial wait", async () => {
    render(<StartupSplash />);
    await act(async () => { await Promise.resolve(); });
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("never restarts when the shared root rerenders for a page change", async () => {
    const view = render(<StartupSplash />);
    await act(async () => { await Promise.resolve(); });
    view.rerender(<StartupSplash />);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("opens within 800ms even when fonts do not finish loading", () => {
    vi.useFakeTimers();
    const original = Object.getOwnPropertyDescriptor(document, "fonts");
    Object.defineProperty(document, "fonts", { configurable: true, value: { ready: new Promise(() => {}) } });
    try {
      render(<StartupSplash />);
      expect(screen.queryByRole("status")).not.toBeNull();
      act(() => { vi.advanceTimersByTime(800); });
      expect(screen.queryByRole("status")).toBeNull();
    } finally {
      if (original) Object.defineProperty(document, "fonts", original);
      else Reflect.deleteProperty(document, "fonts");
    }
  });
});