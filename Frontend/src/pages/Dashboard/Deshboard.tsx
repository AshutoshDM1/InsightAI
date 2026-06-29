import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import ChatComponent from "./components/ChatPage";
import Sidebar from "./components/Sidebar";

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full bg-black text-white flex overflow-hidden">
      <AnimatedGradientBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col relative h-screen overflow-hidden">
        <ChatComponent />
      </div>
    </main>
  );
}
