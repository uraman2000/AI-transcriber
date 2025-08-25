import React from "react";
import closeIcon from "../assets/close-icon.svg";
import { Button } from "./ui/button";
interface ModalPaperI {
  children: React.ReactNode;
  title?: React.ReactNode;
  onOk?: () => void;
  onClose: () => void;
  onEdit?: () => void;
  isEdit?: boolean;
}
function ModalPaper({
  children,
  title,
  onOk,
  onClose,
  onEdit,
  isEdit,
}: ModalPaperI) {
  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center h-full rounded-md">
      <div className="w-3/4 md:w-2/4 bg-white shadow-2xl rounded-sm flex flex-col p-4">
        <header className="flex">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" className="ml-auto" onClick={onClose}>
            <img src={closeIcon} alt="Close" width={20} height={20} />
          </Button>
        </header>
        <main className="mt-4 flex-grow ">{children}</main>
        <footer className="mt-4 flex justify-end gap-2">
          {!isEdit && (
            <Button variant="secondary" onClick={onEdit}>
              Edit
            </Button>
          )}

          <Button onClick={onOk}>Save</Button>
        </footer>
      </div>
    </div>
  );
}

export default ModalPaper;
