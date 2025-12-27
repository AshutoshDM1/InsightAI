import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import ChatComponent from "./components/ChatPage";

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <AnimatedGradientBackground />
      <ChatComponent />
    </main>
  );
}
