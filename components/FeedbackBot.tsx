'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/* ── Types ───────────────────────────────────────────────────────────── */
type FeedbackType = 'bug' | 'suggestion' | 'content' | 'other';
type Step = 'idle' | 'greeting' | 'pick_type' | 'write_message' | 'ask_contact' | 'submitting' | 'done' | 'error';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const TYPE_LABELS: Record<FeedbackType, string> = {
  bug: '🐛 Bug / Broken feature',
  suggestion: '💡 Suggestion',
  content: '🎬 Content issue',
  other: '💬 Other',
};

const BOT_GREET = "👋 Hey! I'm the AdultTube feedback bot.\nFound a bug or have a suggestion? I'll pass it straight to the team.";
const BOT_PICK  = "What kind of feedback do you have?";
const BOT_MSG   = (t: FeedbackType) => `Got it — ${TYPE_LABELS[t]}.\nDescribe the issue in as much detail as you like:`;
const BOT_CONTACT = "Almost done! Want to leave an email or name so we can follow up? (Optional — hit Send to skip)";
const BOT_DONE  = "✅ Thanks! Your feedback has been saved. We'll look into it ASAP.";
const BOT_ERR   = "❌ Something went wrong while saving. Please try again.";

/* ── Component ───────────────────────────────────────────────────────── */
export default function FeedbackBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // focus input when step needs typing
  useEffect(() => {
    if (step === 'write_message' || step === 'ask_contact') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [step]);

  function addBot(text: string) {
    setMessages(prev => [...prev, { from: 'bot', text }]);
  }
  function addUser(text: string) {
    setMessages(prev => [...prev, { from: 'user', text }]);
  }

  /* open → start conversation */
  function handleOpen() {
    setOpen(true);
    setUnread(false);
    if (step === 'idle') {
      setStep('greeting');
      setMessages([{ from: 'bot', text: BOT_GREET }]);
      setTimeout(() => {
        addBot(BOT_PICK);
        setStep('pick_type');
      }, 700);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  /* user picks a type */
  function handlePickType(type: FeedbackType) {
    setFeedbackType(type);
    addUser(TYPE_LABELS[type]);
    setStep('write_message');
    setTimeout(() => addBot(BOT_MSG(type)), 400);
  }

  /* user submits message text */
  function handleSendMessage() {
    const msg = inputVal.trim();
    if (!msg) return;
    setUserMessage(msg);
    addUser(msg);
    setInputVal('');
    setStep('ask_contact');
    setTimeout(() => addBot(BOT_CONTACT), 400);
  }

  /* final submit */
  const handleSubmit = useCallback(async (contact: string) => {
    if (contact) addUser(contact || '(no contact)');
    setStep('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: feedbackType,
          message: userMessage,
          contact: contact || undefined,
          page: window.location.pathname + window.location.search,
        }),
      });
      if (!res.ok) throw new Error('API error');
      setStep('done');
      setTimeout(() => addBot(BOT_DONE), 300);
    } catch {
      setStep('error');
      setTimeout(() => addBot(BOT_ERR), 300);
    }
  }, [feedbackType, userMessage]);

  function handleContactSend() {
    const contact = inputVal.trim();
    setInputVal('');
    handleSubmit(contact);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (step === 'write_message') handleSendMessage();
      else if (step === 'ask_contact') handleContactSend();
    }
  }

  function handleReset() {
    setStep('pick_type');
    setFeedbackType(null);
    setUserMessage('');
    setInputVal('');
    setMessages([
      { from: 'bot', text: BOT_GREET },
      { from: 'bot', text: BOT_PICK },
    ]);
  }

  const showInput = step === 'write_message' || step === 'ask_contact';
  const sendAction = step === 'write_message' ? handleSendMessage : handleContactSend;
  const placeholder = step === 'write_message'
    ? 'Describe your issue or suggestion…'
    : 'Email or name (optional)…';

  return (
    <>
      {/* Floating button */}
      <button
        id="feedback-bot-toggle"
        className="feedback-fab"
        onClick={open ? handleClose : handleOpen}
        aria-label="Open feedback"
        title="Report an issue / Send feedback"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            {unread && <span className="feedback-fab-dot" />}
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="feedback-panel" id="feedback-panel">
          {/* Header */}
          <div className="feedback-header">
            <div className="feedback-header-info">
              <div className="feedback-avatar">🤖</div>
              <div>
                <div className="feedback-header-title">Feedback Bot</div>
                <div className="feedback-header-sub">Report issues &amp; suggestions</div>
              </div>
            </div>
            <button className="feedback-close-btn" onClick={handleClose} aria-label="Close">✕</button>
          </div>

          {/* Messages */}
          <div className="feedback-messages" id="feedback-messages">
            {messages.map((m, i) => (
              <div key={i} className={`feedback-msg feedback-msg--${m.from}`}>
                {m.from === 'bot' && <div className="feedback-msg-avatar">🤖</div>}
                <div className="feedback-msg-bubble">
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Type picker buttons */}
            {step === 'pick_type' && (
              <div className="feedback-type-grid">
                {(Object.entries(TYPE_LABELS) as [FeedbackType, string][]).map(([k, label]) => (
                  <button
                    key={k}
                    id={`feedback-type-${k}`}
                    className="feedback-type-btn"
                    onClick={() => handlePickType(k)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Submitting indicator */}
            {step === 'submitting' && (
              <div className="feedback-msg feedback-msg--bot">
                <div className="feedback-msg-avatar">🤖</div>
                <div className="feedback-msg-bubble feedback-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* Reset after done/error */}
            {(step === 'done' || step === 'error') && (
              <button className="feedback-restart-btn" onClick={handleReset} id="feedback-restart">
                {step === 'done' ? '💬 Send more feedback' : '🔄 Try again'}
              </button>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {showInput && (
            <div className="feedback-input-row">
              <textarea
                ref={inputRef}
                id="feedback-input"
                className="feedback-textarea"
                placeholder={placeholder}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                maxLength={2000}
              />
              <button
                id="feedback-send-btn"
                className="feedback-send-btn"
                onClick={sendAction}
                disabled={step === 'write_message' && !inputVal.trim()}
                aria-label="Send"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
