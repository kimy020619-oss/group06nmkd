import { describe, expect, it } from "vitest";
import { CONTACT, CONTACT_LINKS } from "@/lib/site-data";

describe("Contact details", () => {
  it("lists the HUFLIT Hoc Mon studio address", () => {
    expect(CONTACT.address).toBe("HUFLIT Hoc Mon Campus, Ho Chi Minh City");
  });
  it("lists hotline 0922598271 with a tel: link", () => {
    expect(CONTACT.hotline).toBe("0922598271");
    expect(CONTACT_LINKS.hotline).toBe("tel:0922598271");
  });
  it("lists email photomemora111@gmail.com with a mailto: link", () => {
    expect(CONTACT.email).toBe("photomemora111@gmail.com");
    expect(CONTACT_LINKS.email).toBe("mailto:photomemora111@gmail.com");
  });
  it("lists opening hours 10 a.m. to 10 p.m.", () => {
    expect(CONTACT.hours).toBe("10 a.m. to 10 p.m.");
  });
  it("links Instagram and TikTok profiles", () => {
    expect(CONTACT.instagram).toBe("https://www.instagram.com/photomemora_");
    expect(CONTACT.tiktok).toBe("https://www.tiktok.com/@photomemora1th11");
  });
  it("has no Facebook or marketplace entries", () => {
    expect(CONTACT).not.toHaveProperty("facebook");
    expect(CONTACT).not.toHaveProperty("marketplace");
  });
});
