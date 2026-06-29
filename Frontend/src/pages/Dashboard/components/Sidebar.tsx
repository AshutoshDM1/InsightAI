import { useChatStore } from "@/store/store";
import { Plus, MessageSquare, Trash2, Edit3, Check, X, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const sessions = useChatStore((state) => state.sessions);
  const currentSessionId = useChatStore((state) => state.currentSessionId);
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen);
  const createNewChat = useChatStore((state) => state.createNewChat);
  const switchChat = useChatStore((state) => state.switchChat);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const updateChatTitle = useChatStore((state) => state.updateChatTitle);
  const clearAllChats = useChatStore((state) => state.clearAllChats);
  const toggleSidebar = useChatStore((state) => state.toggleSidebar);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleStartEdit = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveEdit = (id: string, e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (editTitle.trim()) {
      updateChatTitle(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden cursor-pointer transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[100] flex w-64 flex-col border-r border-neutral-900 bg-black transition-all duration-300 ease-in-out h-screen",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top Header - Brand + New Chat */}
        <div className="flex flex-col gap-2 p-4 relative">
          <button
            onClick={toggleSidebar}
            className="absolute left-4 top-3 rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white cursor-pointer transition-colors"
            title="Collapse sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-between h-8">
            <span className="text-sm font-semibold tracking-wider text-neutral-400 uppercase pl-12">
              Insight AI
            </span>
          </div>

          <Button
            onClick={() => createNewChat()}
            className={cn(
              "mt-2 w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 py-5 text-sm font-semibold text-white transition-all cursor-pointer",
              "hover:bg-neutral-900 hover:border-neutral-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]"
            )}
          >
            <Plus className="h-4 w-4 text-blue-500" />
            New Chat
          </Button>
        </div>

        {/* Chat Sessions list */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {sessions.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-neutral-500 italic">
              No chats yet. Create one!
            </div>
          ) : (
            sessions.map((session) => {
              const isActive = session.id === currentSessionId;
              const isEditing = session.id === editingId;

              return (
                <div
                  key={session.id}
                  onClick={() => !isEditing && switchChat(session.id)}
                  className={cn(
                    "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer select-none",
                    isActive
                      ? "bg-neutral-900 text-white font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                      : "text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200"
                  )}
                >
                  <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
                    <MessageSquare
                      className={cn(
                        "h-4 w-4 flex-shrink-0",
                        isActive ? "text-blue-400" : "text-neutral-500 group-hover:text-neutral-400"
                      )}
                    />

                    {isEditing ? (
                      <form
                        onSubmit={(e) => handleSaveEdit(session.id, e)}
                        className="flex-1 overflow-hidden"
                      >
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => handleSaveEdit(session.id)}
                          className="w-full bg-transparent p-0 text-sm text-white outline-none border-b border-blue-500"
                        />
                      </form>
                    ) : (
                      <span className="truncate pr-8">{session.title}</span>
                    )}
                  </div>

                  {/* Actions on hover */}
                  {!isEditing && (
                    <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleStartEdit(session.id, session.title, e)}
                        className="rounded p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white"
                        title="Rename chat"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(session.id, e)}
                        className="rounded p-1 text-neutral-500 hover:bg-neutral-800 hover:text-red-400"
                        title="Delete chat"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <div className="absolute right-2 flex items-center gap-1">
                      <button
                        onMouseDown={(e) => handleSaveEdit(session.id, e)}
                        className="rounded p-1 text-emerald-400 hover:bg-neutral-800"
                        title="Save title"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="rounded p-1 text-red-400 hover:bg-neutral-800"
                        title="Cancel"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer - Options */}
        <div className="border-t border-neutral-900 p-4">
          <Button
            variant="ghost"
            onClick={() => {
              if (confirm("Are you sure you want to delete all chats? This cannot be undone.")) {
                clearAllChats();
              }
            }}
            className="w-full flex items-center justify-start gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-500 transition-all hover:bg-red-950/20 hover:text-red-400"
          >
            <Trash className="h-3.5 w-3.5" />
            Clear all chats
          </Button>
        </div>
      </aside>
    </>
  );
}
