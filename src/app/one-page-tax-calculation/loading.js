export default function PageLoaderOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex space-x-2">
          <span className="w-4 h-4 rounded-full bg-[#ed8936] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 rounded-full bg-[#ed8936] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 rounded-full bg-[#ed8936] animate-bounce"></span>
        </div>
        <p className="text-gray-700 font-medium text-lg mt-2">Loading...</p>
      </div>
    </div>
  );
}
