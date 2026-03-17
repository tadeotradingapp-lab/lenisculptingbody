import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { StickyCTA } from "./StickyCTA";

interface LayoutProps {
  children: ReactNode;
  showStickyCTA?: boolean;
  stickyLabel?: string;
  stickyTo?: string;
}

export function Layout({ children, showStickyCTA = true, stickyLabel, stickyTo }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
      {showStickyCTA && <StickyCTA label={stickyLabel} to={stickyTo} />}
    </div>
  );
}
