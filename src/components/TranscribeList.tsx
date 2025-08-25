import {
  useDeleteTranscriptionMutation,
  useGetTranscriptionQuery,
} from "@/api/supabase/supabaseApi";
import { Button } from "@/components/ui/button";
import closeIcon from "../assets/close-icon.svg";
import arrowUpIcon from "../assets/arrow-up-icon.svg";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TranscribeView from "./TranscribeView";

export default function TranscribeList() {
  const [isShowList, setIsShowList] = useState(false);

  const { data } = useGetTranscriptionQuery();
  const [deleteTranscription, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteTranscriptionMutation();

  const handleToggleShow = () => {
    setIsShowList((prev) => !prev);
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success("Transcription has been deleted.");
    }
  }, [isDeleted]);

  return (
    <>
      <Button
        variant="default"
        className="fixed bottom-3  rounded-full shadow-2xl z-50"
        onClick={handleToggleShow}
      >
        <img src={arrowUpIcon} alt="Toggle" width={20} height={20} />
      </Button>

      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-1000 z-40 ${
          isShowList ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleToggleShow}
      ></div>

      <div
        className={`fixed bottom-0  w-full lg:w-2/4 bg-white shadow-2xl rounded-t-lg p-4 z-50 transform transition-transform duration-500 ${
          isShowList ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Transcriptions List</h2>
          <Button variant="ghost" onClick={handleToggleShow}>
            <img src={closeIcon} alt="Close" width={20} height={20} />
          </Button>
        </div>

        <div className="mt-4 overflow-y-auto h-[70vh]">
          <Loader isLoading={isDeleting}>
            <ul className="space-y-5">
              {data?.length === 0 && (
                <li className="text-gray-500">No transcriptions found.</li>
              )}

              {data &&
                data.map((item) => (
                  <TranscribeView
                    key={item.id}
                    data={item}
                    Trigger={() => (
                      <li className="hover:bg-gray-50 rounded cursor-pointer p-2">
                        <div className="flex justify-between items-center mb-2">
                          <div className="w-3/4">
                            <p className="line-clamp-1">{item.ciphertext}</p>
                            <span className="text-gray-500">
                              {item.created_at}
                            </span>
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => deleteTranscription(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                        <hr />
                      </li>
                    )}
                  />
                ))}
            </ul>
          </Loader>
        </div>
      </div>
    </>
  );
}
