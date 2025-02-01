
export const LoadingDots = () => {
  return (
    <div className="flex flex-col items-center gap-2 p-10">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-blue-700 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
