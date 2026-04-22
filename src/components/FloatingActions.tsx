import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { findBestMatch, getFallbackResponse } from '@/lib/faqDatabase';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollY } = useScroll();
  const { t, language } = useLanguage();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 300);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Add greeting message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: t.chatbot.greeting,
        timestamp: Date.now(),
      }]);
    }
  }, [isOpen, messages.length, t.chatbot.greeting]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const match = findBestMatch(text);
      const response = match
        ? (match.answer[language] || match.answer.en)
        : getFallbackResponse(language);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  }, [inputValue, language]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-8 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.85) 100%)',
                boxShadow: '0 8px 24px hsl(var(--primary)/0.35), 0 4px 12px rgba(0,0,0,0.15)',
              }}
              aria-label="VEXA AI Assistant"
            >
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  <path d="M12 2C6.48 2 2 5.92 2 10.75C2 13.2 3.24 15.4 5.2 16.9L4 21L8.5 19.2C9.6 19.7 10.76 20 12 20C17.52 20 22 16.08 22 11.25C22 6.42 17.52 2 12 2Z" fill="currentColor" opacity="0.9" />
                  <circle cx="8" cy="11" r="1.5" fill="hsl(var(--primary))" />
                  <circle cx="12" cy="11" r="1.5" fill="hsl(var(--primary))" />
                  <circle cx="16" cy="11" r="1.5" fill="hsl(var(--primary))" />
                </svg>
                <motion.div
                  className="absolute -inset-1 rounded-full"
                  style={{ background: 'radial-gradient(circle, hsl(var(--primary-foreground)/0.15) 0%, transparent 70%)' }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.2, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <motion.div
                className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2"
                style={{ backgroundColor: '#4ade80', borderColor: 'hsl(var(--background))' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.08) 0%, transparent 100%)' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--primary)/0.15)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 5.92 2 10.75C2 13.2 3.24 15.4 5.2 16.9L4 21L8.5 19.2C9.6 19.7 10.76 20 12 20C17.52 20 22 16.08 22 11.25C22 6.42 17.52 2 12 2Z" fill="hsl(var(--primary))" opacity="0.8" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{t.chatbot.title}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-muted/50">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted/60 text-foreground rounded-bl-md'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5 [&_strong]:text-foreground [&_h3]:text-base [&_h3]:mt-2 [&_h3]:mb-1 [&_table]:text-xs">
                        <ReactMarkdown
                          allowedElements={['p', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'code', 'pre', 'blockquote', 'a', 'span']}
                          unwrapDisallowed
                        >{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-muted/60 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <motion.div className="h-2 w-2 rounded-full bg-muted-foreground/50" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                      <motion.div className="h-2 w-2 rounded-full bg-muted-foreground/50" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="h-2 w-2 rounded-full bg-muted-foreground/50" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-1.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.chatbot.placeholder}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-30"
                  style={{ background: inputValue.trim() ? 'hsl(var(--primary))' : 'transparent' }}
                >
                  <Send className={`h-4 w-4 ${inputValue.trim() ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
