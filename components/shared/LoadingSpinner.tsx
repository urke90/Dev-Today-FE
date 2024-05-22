interface ILoadingSpinnerProps {
  asLayout?: boolean;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ asLayout }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        asLayout
          ? 'bg-opacity/80 absolute left-0 top-0 z-50 size-full bg-black-900 backdrop-blur-md'
          : ''
      }`}
    >
      <div />
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
