import type { ThemeId } from "./lib/themes";

export type PaperSize = "A4" | "A3" | "Letter" | "Legal" | "B5";
export type Orientation = "portrait" | "landscape";

export interface Margins {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface OutputSettings {
  paperSize: PaperSize;
  orientation: Orientation;
  margins: Margins;
  fileName: string;
  theme: ThemeId;
  pageNumbers: boolean;
  headerText: string;
  footerText: string;
  coverPage: boolean;
  customCss: string;
}

export const DEFAULT_SETTINGS: OutputSettings = {
  paperSize: "A4",
  orientation: "portrait",
  margins: { top: "20mm", right: "18mm", bottom: "20mm", left: "18mm" },
  fileName: "document.pdf",
  theme: "default",
  pageNumbers: false,
  headerText: "",
  footerText: "",
  coverPage: false,
  customCss: "",
};

export interface PersistedState {
  markdown: string;
  settings: OutputSettings;
}
