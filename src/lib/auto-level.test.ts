import { describe, it, expect } from "vitest";
import { autoLevel } from "./stats";
import type { AttendanceRow } from "./store";
const V = ["Sabah", "Öğle", "İkindi", "Akşam", "Yatsı"];
const row = (date: string, n: number, ders: boolean): AttendanceRow => ({ id: date, studentId: "a", date, vakitler: V.slice(0, n), ders, durum: "normal", durumlar: {} } as AttendanceRow);
describe("autoLevel", () => {
  it("always attending is Çok İyi", () => expect(autoLevel([row("2026-01-01", 5, true)]).level).toBe("Çok İyi"));
  it("4 of 6 is Orta", () => expect(autoLevel([row("2026-01-01", 3, true)]).level).toBe("Orta"));
  it("1 of 6 is Zayıf", () => expect(autoLevel([row("2026-01-01", 1, false)]).level).toBe("Zayıf"));
  it("no records is Yeni", () => expect(autoLevel([]).level).toBe("Yeni"));
});
