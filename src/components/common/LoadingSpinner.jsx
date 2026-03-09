const LoadingSpinner = ({ size = 8 }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="border-4 border-primary border-t-transparent rounded-full animate-spin"
        style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
