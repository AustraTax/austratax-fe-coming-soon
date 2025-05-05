export default function LoadingSpinner() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Dots animation */}
        <div className="flex space-x-2">
          <span className="w-4 h-4 rounded-full bg-[#ed8936] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 rounded-full bg-[#ed8936] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 rounded-full bg-[#ed8936] animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}
