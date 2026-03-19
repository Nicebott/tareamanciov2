import React, { useState, useEffect } from 'react';
import ForumList from './ForumList';
import TopicView from './TopicView';
import NewTopicModal from './NewTopicModal';
import { Topic, Message } from '../../types/forum';
import { getTopics, getTopicMessages, createTopic, createMessage } from '../../services/forumService';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';
import { MessageSquare } from 'lucide-react';

interface ForumProps {
  darkMode: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

const Forum: React.FC<ForumProps> = ({ darkMode, setIsAuthModalOpen }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; displayName: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUser({
          id: user.id,
          displayName: user.user_metadata?.display_name || user.email || 'Usuario Anonimo',
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          displayName: session.user.user_metadata?.display_name || session.user.email || 'Usuario Anonimo',
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setLoading(true);
    const fetchedTopics = await getTopics();
    setTopics(fetchedTopics);
    setLoading(false);
  };

  const handleTopicClick = async (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      setSelectedTopic(topic);
      setMessages([]);
      setMessagesLoading(true);
      const fetchedMessages = await getTopicMessages(topicId);
      setMessages(fetchedMessages);
      setMessagesLoading(false);
    }
  };

  const handleNewTopic = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setShowNewTopicModal(true);
  };

  const handleCreateTopic = async (title: string, description: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const topicId = await createTopic(
      title,
      description,
      currentUser.id,
      currentUser.displayName
    );

    if (topicId) {
      toast.success('Tema creado exitosamente');
      setShowNewTopicModal(false);
      loadTopics();
    } else {
      toast.error('Error al crear el tema');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentUser || !selectedTopic) {
      setIsAuthModalOpen(true);
      return;
    }

    const messageId = await createMessage(
      selectedTopic.id,
      content,
      currentUser.id,
      currentUser.displayName
    );

    if (messageId) {
      const updatedMessages = await getTopicMessages(selectedTopic.id);
      setMessages(updatedMessages);
    } else {
      toast.error('Error al enviar el mensaje');
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
  };

  const handleBackFromTopic = () => {
    setSelectedTopic(null);
    loadTopics();
  };

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center h-64 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <MessageSquare className="w-12 h-12 mb-4 animate-pulse" />
        <p className="text-lg font-medium">Cargando foros...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedTopic ? (
        <TopicView
          topic={selectedTopic}
          messages={messages}
          onBack={handleBackFromTopic}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          darkMode={darkMode}
          loading={messagesLoading}
        />
      ) : (
        <ForumList
          topics={topics}
          onTopicClick={handleTopicClick}
          onNewTopic={handleNewTopic}
          darkMode={darkMode}
        />
      )}

      <NewTopicModal
        isOpen={showNewTopicModal}
        onClose={() => setShowNewTopicModal(false)}
        onSubmit={handleCreateTopic}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Forum;
