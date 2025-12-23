import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import ChatComponent from "./components/chatComponent";

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <AnimatedGradientBackground />
      {/* Chat Component */}
      <section className="flex justify-center items-start w-full">
        <ChatComponent />
      </section>

      {/* Footer */}
      <footer className="text-center text-neutral-500 py-2  border-t border-neutral-800 text-sm z">
        © {new Date().getFullYear()} Insight AI
      </footer>
    </main>
  );
}