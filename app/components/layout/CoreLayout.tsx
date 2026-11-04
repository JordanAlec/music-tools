import SiteHeader from "./SiteHeader";
import MainContent from "./MainContent";
import SiteFooter from "./SiteFooter";

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <MainContent>{children}</MainContent>
      <SiteFooter />
    </div>
  );
}
