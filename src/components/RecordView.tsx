import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import RecordingToggle from "./RecordingToggle";

interface RecordViewProps {
  onMediaBlobUrl: (url: string) => void;
}

const RecordView = ({ onMediaBlobUrl }: RecordViewProps) => {
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop(blobUrl) {
      onMediaBlobUrl(blobUrl);
    },
  });

  return (
    <ReactMediaRecorder
      audio
      render={() => (
        <RecordingToggle
          stopRecording={stopRecording}
          startRecording={startRecording}
          status={status}
        />
      )}
    />
  );
};

export default RecordView;
