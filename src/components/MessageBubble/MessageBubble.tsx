import "./MessageBubble.css";

interface MessageBubbleProps {
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

function MessageBubble({ text, sender, timestamp }: MessageBubbleProps) {
  return (
    <div className={`message-bubble message-bubble--${sender}`}>
      <div className="message-bubble__text">{text}</div>
      <span className="message-bubble__time">
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

export default MessageBubble;
