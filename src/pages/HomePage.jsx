import React from 'react';
import { useState } from 'react';
import MultiStepForm from '../components/MultiStepForm';
import Modal from '../components/Modal';
import RightSidebar from '../components/RightSidebar';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="font-sans text-brand-purple">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-light to-brand-background py-20 text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-brand-purple">Unlock the Mysteries of Your Dreams</h1>
        <p className="text-brand-purple/70 mb-6">
          Share your dreams and receive professional interpretations from our experienced moderators.
        </p>
        <button
          onClick={openModal}
          className="bg-brand-purple text-white px-6 py-2 rounded-full hover:bg-brand-dark transition"
        >
          Share Your Dream
        </button>
      </section>

      {/* Dream Submission Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <MultiStepForm />
      </Modal>

      {/* Recent Dreams */}
      <section className="py-12 px-6 bg-brand-background">
        <h2 className="text-2xl font-bold mb-6 text-brand-purple">Recent Dreams</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Flying Over Mountains',
              excerpt: 'Last night, I dreamed I was soaring over snow-capped mountains...',
              time: '2 hours ago'
            },
            {
              title: 'The Endless Library',
              excerpt: 'I found myself wandering through an infinite library...',
              time: '5 hours ago'
            },
            {
              title: 'Ocean of Stars',
              excerpt: 'The ocean was filled with glowing stars, and they danced...',
              time: '1 day ago'
            },
          ].map((dream, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-5">
              <h3 className="font-semibold text-lg mb-2 text-brand-purple">{dream.title}</h3>
              <p className="text-sm text-brand-purple/70 mb-4">{dream.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-brand-purple/60">
                <span>{dream.time}</span>
                <a onClick={() => setSelectedDream(dream)} href="#" className="text-brand-purple font-medium">Read More</a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <RightSidebar
          isOpen={!!selectedDream}
          onClose={() => setSelectedDream(null)}
        >
          {selectedDream && (
            <div>
              <h3 className="text-xl font-bold mb-2 text-brand-purple">{selectedDream.title}</h3>
              <p className="text-brand-purple/70">{selectedDream.meaning}</p>
            </div>
          )}
        </RightSidebar>

        <div className="text-center mt-8">
          <a href="#" className="text-brand-purple font-medium inline-flex items-center hover:underline">
            View All Dreams <span className="ml-1">→</span>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-brand-light px-6 text-center text-brand-purple">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl mb-2">✍️</div>
            <h4 className="font-semibold text-lg mb-2">Share Your Dreams</h4>
            <p className="text-sm text-brand-purple/70">
              Submit your dreams anonymously and get professional interpretations
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🧠</div>
            <h4 className="font-semibold text-lg mb-2">Expert Analysis</h4>
            <p className="text-sm text-brand-purple/70">
              Receive insights from experienced dream interpreters
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold text-lg mb-2">Private & Secure</h4>
            <p className="text-sm text-brand-purple/70">
              Your dreams are stored securely and shared anonymously
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
