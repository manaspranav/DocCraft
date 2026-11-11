type Props = {
  children: React.ReactNode;
};

export default function LandingWrapper({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#d8b4fe] to-[#f0abfc] px-6 py-10 flex items-center justify-center text-center">
      <div className="max-w-3xl">{children}</div>
    </div>
  );
}
