import {
  useCreateTranscriptionMutation,
  useUpdateTranscriptionMutation,
} from "@/api/supabase/supabaseApi";
import React, { useEffect, useState } from "react";
import ModalPaper from "./ModalPaper";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import Loader from "./Loader";
import type { Transcription } from "@/api/supabase/transcription.type";

interface TranscribeViewI {
  data: Transcription;
  isOnEditView?: boolean;
  Trigger: () => React.ReactNode;
}

export default function TranscribeView({
  data,
  isOnEditView = false,
  Trigger,
}: TranscribeViewI) {
  const [
    createTranscription,
    { isLoading: isCreatLoading, isSuccess: isCreateSuccess },
  ] = useCreateTranscriptionMutation();

  const [
    updateTranscription,
    { isLoading: isUpdating, isSuccess: isUpdateSuccess },
  ] = useUpdateTranscriptionMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(isOnEditView);
  const [TranscriptText, setTranscriptText] = useState(data.ciphertext);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      toast.success(
        `Transcription ${isCreateSuccess ? "created" : "updated"} successfully!`
      );
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  const handleSave = () => {
    if (!isEdit) return closeModal();

    const action = data.id
      ? () =>
          updateTranscription({ id: data.id, newTranscription: TranscriptText })
      : () => createTranscription(TranscriptText);

    action();
    closeModal();
  };
  const contentHandler = () => {
    if (isEdit) {
      return (
        <Textarea
          className="h-40"
          value={TranscriptText}
          onChange={(e) => setTranscriptText(e.target.value)}
        />
      );
    }
    return <p className="break-all whitespace-normal">{data.ciphertext}</p>;
  };
  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <Trigger />
      </div>
      {isOpen && (
        <ModalPaper
          title={isEdit ? "Edit Transcription" : "View Transcribe"}
          onOk={handleSave}
          onClose={closeModal}
          onEdit={() => {
            setIsEdit(true);
          }}
          isEdit={isEdit}
        >
          <Loader isLoading={isCreatLoading || isUpdating}>
            {contentHandler()}
          </Loader>
        </ModalPaper>
      )}
    </>
  );
}
