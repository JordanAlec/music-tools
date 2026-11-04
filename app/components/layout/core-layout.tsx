import SiteHeader from "./site-header";
import MainContent from "./main-content";
import SiteFooter from "./site-footer";

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <MainContent>{children}</MainContent>
      <SiteFooter />
    </div>
  );
}
