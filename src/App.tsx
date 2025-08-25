import { useCallback, useEffect } from "react";
import { Toaster } from "sonner";
import { useTranscribeMutation } from "./api/transcriptionApi";
import RecordView from "./components/RecordView";
import TranscribeList from "./components/TranscribeList";

export default function App() {
  const [transcribe, { data }] = useTranscribeMutation();

  useEffect(() => {
    if (data) {
      console.log("Transcription result:", data);
    }

    return () => {
      console.log("Cleanup");
    };
  }, [data]);

  const handleTranscription = useCallback(
    (url: string) => {
      const formData = new FormData();
      formData.append("file", url);
      transcribe(formData);
    },
    [transcribe]
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <RecordView onMediaBlobUrl={(url) => handleTranscription(url)} />
      {/* <TranscribeView data={data} Trigger={() => <button>Open</button>} /> */}
      <Toaster position="top-right" />
      <TranscribeList />
    </div>
  );
}
