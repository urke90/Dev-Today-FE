import { Button } from '../ui/button';

interface IPaginationProps {
  currentPage: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  disableNextBtn: boolean;
  disablePrevBtn: boolean;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPage,
  setPage,
  disableNextBtn,
  disablePrevBtn,
}) => {
  return (
    <div className="flex-center">
      <div className="flex">
        <Button
          className="bg-white-200 dark:bg-black-800 rounded-[5px] py-2.5 px-3.5"
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={disablePrevBtn}
        >
          <span className="p3-medium">Prev</span>
        </Button>
        <div className="flex-center py-2.5 px-8">
          <span className="p3-regular">
            {currentPage}/{totalPage}
          </span>
        </div>
        <Button
          className="bg-white-200 dark:bg-black-800 rounded-[5px] py-2.5 px-3.5"
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
          }}
          disabled={disableNextBtn}
        >
          <span className="p3-medium">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
