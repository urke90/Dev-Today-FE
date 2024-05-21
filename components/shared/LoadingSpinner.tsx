interface ILoadingSpinnerProps {
  asLayout?: boolean;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ asLayout }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        asLayout
          ? 'absolute w-full h-full top-0 left-0 z-50 backdrop-blur-md bg-black-900 bg-opacity-80'
          : ''
      }`}
    >
      <div />
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
