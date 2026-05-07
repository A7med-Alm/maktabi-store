import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maktabi — مكتبي",
  description: "Curate Your Workspace | صمّم مساحة عملك",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
