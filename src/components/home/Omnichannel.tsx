"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import "./omnichannel.css";

const channels = ["Web", "WhatsApp", "Voice", "Email", "SMS", "Microsoft Teams"] as const;
type Channel = typeof channels[number];

function ChannelIcon({ channel }: { channel: Channel }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {channel === "Web" ? <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01m3 0h.01" /></> :
      channel === "Email" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></> :
      channel === "Voice" ? <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M6 11v1a6 6 0 0 0 12 0v-1m-6 7v3m-3 0h6" /></> :
      channel === "Microsoft Teams" ? <><circle cx="9" cy="7" r="3" /><circle cx="18" cy="8" r="2" /><path d="M3 21v-3a6 6 0 0 1 12 0v3m3-7a4 4 0 0 1 3 4v2" /></> :
      <><path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z" />{channel === "WhatsApp" ? <path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-1-3Z" /> : <path d="M8 12h.01M12 12h.01M16 12h.01" />}</>}
  </svg>;
}

export function Omnichannel({ vision = false }: { vision?: boolean }) {
  const scene = useRef<HTMLDivElement>(null);
  const continuedChat = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const channel = step >= 2 && step <= 4 ? "Email" : "WhatsApp";
  const confirmed = step >= 4;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    if (scene.current) observer.observe(scene.current);
    preference.addEventListener("change", updatePreference);
    return () => { observer.disconnect(); preference.removeEventListener("change", updatePreference); };
  }, []);

  useEffect(() => {
    if (!visible || paused || reduced) return;
    const durations = [1800, 3800, 2600, 1600, 2200, 3800];
    const timer = setTimeout(() => setStep(current => (current + 1) % durations.length), durations[step]);
    return () => clearTimeout(timer);
  }, [step, visible, paused, reduced]);

  useEffect(() => {
    if (step === 5 && continuedChat.current) {
      continuedChat.current.scrollTop = continuedChat.current.scrollHeight;
    }
  }, [step]);

  return <section id="omnichannel" className="omni-section section-rule" aria-labelledby="omnichannel-title">
    <div className="page-shell">
      <div className="omni-layout">
        <div className="omni-heading">
          <p className="section-eyebrow">OMNICHANNEL</p>
          <h2 id="omnichannel-title" className="section-title">{vision ? <>Different channels.<br /><em>Connected execution.</em></> : <>The channel changes.<br />The <em>context</em> doesn&apos;t.</>}</h2>
          <p>{vision ? "Bring enterprise knowledge and actions to the channels your customers and employees already use. Start on one channel. Continue on another, with context preserved." : "Start on one channel. Continue on another."}</p>
          <div className="omni-route" aria-label="Conversation continues from WhatsApp to Email and back to WhatsApp"><span>WhatsApp</span><Icon name="arrow" size={18} /><span>Email</span><Icon name="arrow" size={18} /><span>WhatsApp</span></div>
        </div>

        <div ref={scene} className="omni-scene" data-channel={channel} data-step={step} data-paused={paused || !visible}>
          <div className="omni-thread"><span className="omni-avatar"><Icon name="people" size={19} /></span><div><strong>Mobile plan change</strong><span>One conversation · context preserved</span></div><span className="omni-demo">DEMO</span></div>
          <div className="omni-surfaces">
            <article className="omni-whatsapp" aria-label="Conversation started on WhatsApp">
              <h3><ChannelIcon channel="WhatsApp" />WhatsApp<span>Mobile support</span></h3>
              <div className="omni-chat">
                <p className="omni-message omni-customer">I&apos;d like to change my mobile plan.<span>You · 10:24</span></p>
                <p className="omni-message omni-agent"><strong>Plan assistant</strong>Your plan change is ready. I&apos;ve sent the details to your email. Please confirm the change there.<span>10:24</span></p>
              </div>
              <div className="omni-composer" aria-hidden="true"><span>Message</span><Icon name="arrow" size={17} /></div>
            </article>
            <p className="omni-bridge"><span />{step === 5 ? "Same conversation. Confirmed on WhatsApp." : "Same request. Continued in Email."}<Icon name="arrow" size={16} /></p>
            <article className="omni-email" aria-label="Same conversation continued in Email">
              <h3><ChannelIcon channel="Email" />Email<span>Inbox · 1 new message</span></h3>
              <div className="omni-mail-content"><p className="omni-subject">RE: Mobile plan change</p>
                <div className="omni-mail-sender"><span className="omni-sender-avatar">M</span><div><strong>Mobile support</strong><span>To: you · 10:25</span></div></div>
                <h4>Your new plan is ready.</h4>
                <p className="omni-mail-intro">Following our WhatsApp conversation, please confirm your plan change below.</p>
                <dl><div><dt>New plan</dt><dd>Mobile Plus · 20 GB</dd></div><div><dt>Monthly price</dt><dd>$30.00 / month</dd></div><div><dt>Effective</dt><dd>Next billing cycle</dd></div></dl>
                <div className="omni-confirm-wrap">
                  <button className="omni-confirm" disabled={confirmed} onFocus={() => setPaused(true)} onClick={() => { setPaused(true); setStep(5); }}>{confirmed ? "Confirmed through Email" : "Confirm change"}<Icon name="check" size={16} /></button>
                  <span className="omni-cursor" aria-hidden="true"><svg width="27" height="32" viewBox="0 0 27 32"><path d="M3 2v23l6-6 5 10 5-3-5-9h9Z" fill="#081426" stroke="white" strokeWidth="2" /></svg><i /></span>
                </div>
              </div>
            </article>
            <article className="omni-whatsapp-final" aria-label="Plan change confirmed on WhatsApp">
              <h3><ChannelIcon channel="WhatsApp" />WhatsApp<span>Mobile support</span></h3>
              <div ref={continuedChat} className="omni-chat" tabIndex={0} aria-label="WhatsApp conversation history">
                <p className="omni-message omni-customer">I&apos;d like to change my mobile plan.<span>You · 10:24</span></p>
                <p className="omni-message omni-agent"><strong>Plan assistant</strong>Your plan change is ready. I&apos;ve sent the details to your email. Please confirm the change there.<span>10:24</span></p>
                <p className="omni-message omni-agent omni-success-message"><strong>Plan assistant</strong>Your plan has been changed successfully. Thanks for confirming by email. Your new plan takes effect next billing cycle.<span>10:26</span></p>
              </div>
              <div className="omni-composer" aria-hidden="true"><span>Message</span><Icon name="arrow" size={17} /></div>
            </article>
          </div>
          <div className="omni-playback"><span>WhatsApp → Email → WhatsApp</span><button onClick={() => { if (reduced) setStep(confirmed ? 0 : 5); else setPaused(value => !value); }} aria-label={reduced ? "Toggle demo confirmation" : paused ? "Play omnichannel demo" : "Pause omnichannel demo"}><Icon name={paused || reduced ? "play" : "pause"} size={14} />{reduced ? "Preview confirmation" : paused ? "Play" : "Pause"}</button></div>
          <p className="omni-disclaimer">Simplified flow for illustration purposes.</p>
        </div>
      </div>
      <ul className="omni-channels" aria-label="Supported channels">{channels.map(item => <li key={item} data-active={item === channel}><ChannelIcon channel={item} /><span>{item}</span>{item === channel && <span className="omni-current">Current</span>}</li>)}</ul>
    </div>
  </section>;
}
