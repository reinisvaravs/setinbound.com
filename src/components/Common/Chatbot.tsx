"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Types
interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
  timestamp?: Date;
}

interface ModelOption {
  value: string;
  label: string;
}

// Constants
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "/api/chat";
const DEFAULT_GPT = "gpt-3.5-turbo";

// Available models
const AVAILABLE_MODELS: ModelOption[] = [
  { value: "gpt-4o", label: "GPT-4o (Recommended)" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini (Faster)" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5-turbo (Cheaper)" },
];

// Utility functions
const getOrCreateUserId = (): string => {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("walle_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("walle_user_id", id);
  }
  return id;
};

const validateInput = (content: string): string | null => {
  if (!content || content.trim().length === 0) {
    return "Message cannot be empty";
  }
  if (content.length > 4000) {
    return "Message is too long (max 4000 characters)";
  }
  return null;
};

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Chatbot() {
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am WALL-E. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState(DEFAULT_GPT);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Callbacks
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    // Clear previous errors
    setError(null);

    // Validate input
    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((msgs) => [...msgs, userMsg]);
    const currentInput = input.trim();
    setInput("");
    setLoading(true);

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const requestBody = {
        userId,
        username: "You",
        content: currentInput,
        model,
      };

      const res = await fetch(`${BACKEND_URL}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.response) {
        const assistantMsg: Message = {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((msgs) => [...msgs, assistantMsg]);
      } else {
        throw new Error("No response received from server");
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      let errorMessage = "An error occurred while sending your message.";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else if (err.message.includes("Failed to fetch")) {
          errorMessage =
            "Unable to connect to server. Please check your connection.";
        } else if (err.message.includes("HTTP error! status: 400")) {
          errorMessage = "Invalid request. Please check your message.";
        } else if (err.message.includes("HTTP error! status: 500")) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = err.message || errorMessage;
        }
      }

      setError(errorMessage);
      console.error("Error sending message:", err);

      // Add error message to chat
      const errorMsg: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        isError: true,
        timestamp: new Date(),
      };
      setMessages((msgs) => [...msgs, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, userId, model]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const handleToggleChatbot = useCallback(() => {
    setChatbotOpen((prev) => !prev);
    setError(null);
  }, []);

  const handleCloseChatbot = useCallback(() => {
    setChatbotOpen(false);
    setError(null);
  }, []);

  const handleModelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setModel(e.target.value);
    },
    [],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      if (error) setError(null);
    },
    [error],
  );

  // Effects
  useEffect(() => {
    setUserId(getOrCreateUserId());
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (chatbotOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatbotOpen]);

  // Render functions
  const renderMessage = (message: Message, index: number) => (
    <div
      key={index}
      className={`animate-fadeInUp mb-4 ${
        message.role === "user" ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`inline-block max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          message.role === "user"
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
            : message.isError
              ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg"
              : "bg-white/90 text-gray-800 shadow-md"
        }`}
      >
        <div className="break-words">{message.content}</div>
        {message.timestamp && (
          <div className="mt-1 text-xs opacity-60">
            {formatTimestamp(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );

  const renderTypingIndicator = () => (
    <div className="animate-fadeInUp mb-4 text-left">
      <div className="inline-block max-w-[80%] rounded-2xl bg-white/90 px-4 py-3 shadow-md">
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chatbot Container */}
      <div
        className={`hover:shadow-3xl fixed left-1/2 top-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
          chatbotOpen ? "block" : "hidden"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute right-5 top-5 z-50 rounded-full border-2 border-white/30 bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/30"
          onClick={handleCloseChatbot}
          aria-label="Close chatbot"
        >
          ✕
        </button>

        {/* Header */}
        <div className="border-b border-white/10 bg-white/10 p-6 backdrop-blur-sm">
          <h1 className="mb-2 text-xl font-bold text-white drop-shadow-lg">
            WALL-E Chat
          </h1>
          <p className="mb-3 text-sm text-white/80">
            Your AI assistant is here to help
          </p>

          <div className="flex items-center gap-2">
            <label
              htmlFor="model-select"
              className="text-xs font-semibold text-white/90"
            >
              Model:
            </label>
            <select
              id="model-select"
              value={model}
              onChange={handleModelChange}
              disabled={loading}
              className="rounded-lg border border-white/30 bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-all duration-300 focus:border-white/60 focus:bg-white/30 focus:outline-none"
            >
              {AVAILABLE_MODELS.map((m) => (
                <option
                  key={m.value}
                  value={m.value}
                  className="bg-gray-800 text-white"
                >
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="animate-fadeInUp mx-4 my-4 rounded-lg border-l-4 border-red-500 bg-red-500/10 p-3 text-sm text-red-100">
            <p>{error}</p>
          </div>
        )}

        {/* Messages */}
        <div className="scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent h-96 overflow-y-auto bg-white/5 p-5">
          {messages.map((message, index) => renderMessage(message, index))}
          {loading && renderTypingIndicator()}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="border-t border-white/10 bg-white/10 p-5 backdrop-blur-sm">
          <form
            className="flex items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={
                  loading ? "Waiting for response..." : "Type your message..."
                }
                disabled={loading}
                maxLength={4000}
                className="w-full rounded-full border-2 border-white/20 bg-white/90 px-4 py-3 text-sm text-gray-800 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Chat message input"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="min-w-[80px] cursor-pointer rounded-full border-none bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              aria-label="Send message"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          {input.length > 0 && (
            <div className="mt-2 text-center text-xs font-medium text-white/70">
              {input.length}/4000 characters
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className={`fixed bottom-8 right-8 z-40 cursor-pointer rounded-full border border-none border-white/10 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 ${
          chatbotOpen ? "hidden" : "block"
        }`}
        onClick={handleToggleChatbot}
        aria-label="Open chatbot"
      >
        💬 Chat with WALL-E
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thumb-white\\/30 {
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .scrollbar-track-transparent {
          scrollbar-track-color: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thumb-white\\/30::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thumb-white\\/30::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .fixed.top-1\\/2.left-1\\/2 {
            width: 95%;
            max-width: none;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            height: 90vh;
          }

          .fixed.top-1\\/2.left-1\\/2:hover {
            transform: translateX(-50%);
          }

          .h-96 {
            height: 300px;
          }

          .fixed.bottom-8.right-8 {
            bottom: 5;
            right: 5;
            padding: 12px 20px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .fixed.top-1\\/2.left-1\\/2 {
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            transform: none;
            border-radius: 0;
          }

          .fixed.top-1\\/2.left-1\\/2:hover {
            transform: none;
          }

          .h-96 {
            height: 250px;
          }

          .inline-block.max-w-\\[80\\%\\] {
            max-width: 90%;
          }
        }
      `}</style>
    </>
  );
}
