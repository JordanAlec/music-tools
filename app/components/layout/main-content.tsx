import Container from "../container";

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 py-8">
      <Container>{children}</Container>
    </main>
  );
}
