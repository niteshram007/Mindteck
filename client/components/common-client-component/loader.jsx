export default function Loader() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-[100vh] z-50 bg-white flex justify-center items-center">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
