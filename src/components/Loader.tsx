interface LoaderI {
  isLoading: boolean;
  children: React.ReactNode;
}
export default function Loader({ isLoading, children }: LoaderI) {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-blue-500 animate-[spin_1s_linear_infinite]"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
