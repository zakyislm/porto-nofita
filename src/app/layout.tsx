import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

import { getSettings } from "@/lib/data";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.site_title || "Porto | Nofita",
    description: settings.site_description || "Digital creator specializing in public relations and social media strategy.",
    verification: {
      google: "jeEVaKYPTiVYoljU5_I6pYmI6zHZwW28XJLc1ZtNX4g",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const _obf = Buffer.from("ICAgICAgICBfICAgICBfIF8gICAgICAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX18gICAgICAgICBfICAgICBfICAgXyAgICAgICAgICAgICAgICAgICBfX19fICAgICAgIF8gICAgICAgICAgXyAgICAgXyAgICAgICAgICAgICAgICAgIF8gXyAgIF8gICAgICAgICAgIF8gICAgICBfICAgICAgIAogICAgICAgKF8pICAgKF8pIHwgICAgICAgICAgICAgICAgICAgICAgIHwgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX19fX18gX19fX19cIFwgICAgICAgfCB8ICAgfCB8IHwgfCAgICAgICAgICAgIF8gICAgLyAvIC8gICAgICB8IHwgICAgICAgIChfKSAgIHwgfCAgICAgICAgICAgICAgICAoXykgfCB8IHwgICAgICAgICB8IHwgICAgKF8pICAgICAgCiBfXyAgIF9fXyBfX18gX3wgfF8gICAgX19fIF8gX18gX19fICBfXyBffCB8XyBfX18gIF8gX18gICAgX19fICBfIF9fICAgfF9fX19fX3xfX19fX19cIFwgICAgICB8IHxfXyB8IHxffCB8XyBfIF9fICBfX18oXykgIC8gLyAvX19fX18gX3wgfCBfX18gICBfIF8gX19ffCB8XyBfXyBfX18gICAgX18gXyBffCB8X3wgfF9fICBfICAgX3wgfF9fICAgXyAgX19fICAKIFwgXCAvIC8gLyBfX3wgfCBfX3wgIC8gX198ICdfXy8gXyBcLyBfYCB8IF9fLyBfIFx8ICdfX3wgIC8gXyBcfCAnXyBcICAgX19fX19fIF9fX19fXyA+ID4gICAgIHwgJ18gXHwgX198IF9ffCAnXyBcLyBfX3wgICAvIC8gL18gIC8gX2AgfCB8LyAvIHwgfCB8IC8gX198IHwgJ18gYCBfIFwgIC8gX2AgfCB8IF9ffCAnXyBcfCB8IHwgfCAnXyBcIHwgfC8gXyBcIAogIFwgViAvfCBcX18gXCB8IHxfICB8IChfX3wgfCB8ICBfXy8gKF98IHwgfHwgKF8pIHwgfCAgICB8IChfKSB8IHwgfCB8IHxfX19fX198X19fX19fLyAvICAgICAgfCB8IHwgfCB8X3wgfF98IHxfKSBcX18gXF8gLyAvIC8gLyAvIChffCB8ICAgPHwgfF98IHwgXF9fIFwgfCB8IHwgfCB8IHx8IChffCB8IHwgfF98IHwgfCB8IHxffCB8IHxfKSB8fCB8IChfKSB8CiAgIFxfLyB8X3xfX18vX3xcX198ICBcX19ffF98ICBcX19ffFxfXyxffFxfX1xfX18vfF98ICAgICBcX19fL3xffCB8X3wgICAgICAgICAgICAgIC9fLyAgICAgICB8X3wgfF98XF9ffFxfX3wgLl9fL3xfX18oXylfL18vIC9fX19cX18sX3xffFxfXFxfXywgfF98X19fL198X3wgfF98IHxfKF8pX18sIHxffFxfX3xffCB8X3xcX18sX3xfLl9fKF8pX3xcX19fLyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fLyB8ICAgICAgICAgICAgICAgICAgICBfXy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8X3wgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8X19fLyAgICAgICAgICAgICAgICAgICAgfF9fXy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg", "base64").toString("utf-8");
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `\n/*\n${_obf}\n*/\n` }} />
        <Script id="creator-mark" strategy="beforeInteractive">
          {`console.log(${JSON.stringify("\\n" + _obf)});`}
        </Script>
      </head>
      <body className={`${manrope.variable} antialiased relative`}>
        <NextTopLoader
          color="#000000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={6}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #000,0 0 5px #000"
          zIndex={1600}
        />
        <div className="bg-grid" />
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}
