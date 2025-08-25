import type { StatusMessages } from "react-media-recorder";
import PlayIcon from "../assets/play-icon.svg";
import StopIcon from "../assets/stop-icon.svg";
import { cn } from "../utils/utils";

interface RecordingToggleProps {
  stopRecording: () => void;
  startRecording: () => void;
  status: StatusMessages;
}

export default function RecordingToggle({
  stopRecording,
  startRecording,
  status,
}: RecordingToggleProps) {
  const icon = status === "recording" ? StopIcon : PlayIcon;

  return (
    <button
      className="relative flex items-center justify-center w-64 h-64"
      onClick={status === "recording" ? stopRecording : startRecording}
    >
      {status === "recording" && (
        <span className="absolute size-96 rounded-full bg-red-500 opacity-30 animate-ping blur-xl"></span>
      )}
      <img
        className={cn(
          "transition-opacity duration-1000 size-40 cursor-pointer",
          {
            "opacity-50 hover:opacity-70 ": status === "recording",
          }
        )}
        src={icon}
        alt="icon"
        width={40}
        height={40}
      />
    </button>
  );
}
