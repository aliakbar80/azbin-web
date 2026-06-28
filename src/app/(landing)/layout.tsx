export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-root min-h-screen" dir="rtl">
      {children}
    </div>
  );
}
