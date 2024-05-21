'use client';

type Props = {
  setIsPreview: (value: boolean) => void;
};

const Preview = ({ setIsPreview }: Props) => {
  return (
    <div>
      <h1 onClick={() => setIsPreview(false)}>Preview</h1>
    </div>
  );
};
export default Preview;
