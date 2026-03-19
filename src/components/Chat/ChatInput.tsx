import React, { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { Smile, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EmojiClickData } from 'emoji-picker-react';

const EmojiPicker = lazy(() => import('emoji-picker-react'));

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  darkMode: boolean;
  username?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, darkMode, username }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('button[aria-label="emoji-button"]')) {
          setShowEmojiPicker(false);
        }
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col relative">
      <motion.div
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        className={`flex rounded-xl overflow-hidden border-2 transition-colors ${
          isFocused
            ? darkMode ? 'border-blue-500/50' : 'border-blue-400/50'
            : darkMode ? 'border-gray-700' : 'border-gray-200'
        } ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-grow px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm bg-transparent focus:outline-none ${
            darkMode
              ? 'text-white placeholder-gray-400'
              : 'text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Escribe un mensaje..."
        />
        <motion.button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="emoji-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`px-2.5 md:px-3 py-2 flex-shrink-0 transition-colors ${
            darkMode
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Smile className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
        <motion.button
          type="submit"
          disabled={!message.trim()}
          whileHover={{ scale: message.trim() ? 1.05 : 1 }}
          whileTap={{ scale: message.trim() ? 0.95 : 1 }}
          className={`px-3 md:px-4 py-2 flex items-center justify-center flex-shrink-0 transition-all relative overflow-hidden ${
            message.trim()
              ? darkMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-500'
                : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
          {message.trim() && (
            <motion.div
              className="absolute inset-0 bg-white opacity-0 hover:opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            ref={emojiPickerRef}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute right-0 bottom-full mb-2 z-10 scale-75 md:scale-100 origin-bottom-right"
          >
            <Suspense fallback={
              <div className={`w-[280px] h-[350px] flex items-center justify-center rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            }>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={darkMode ? 'dark' : 'light'}
                width={280}
                height={350}
                lazyLoadEmojis={true}
                searchPlaceHolder="Buscar emoji..."
                previewConfig={{
                  showPreview: false
                }}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ChatInput;