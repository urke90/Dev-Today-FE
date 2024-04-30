import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import SearchIcon from '../icons/Search';

interface ISearchDialogProps {}

const SearchMenuDialog: React.FC<ISearchDialogProps> = (props) => {
  return (
    <Root>
      <Trigger asChild>
        <Button className="p-1.5 lg:p-2.5 bg-white-200 dark:bg-black-700 h-auto">
          <SearchIcon className="icon-white-400__dark-white-300" />
        </Button>
      </Trigger>
      <Portal>
        <Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
        <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[346px] lg:w-[576px]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] border border-[#C5D0E666] dark:border-[#393E4F66]  focus:outline-none bg-white-100 shadow-search-dialog">
          This is SearchDialog component
        </Content>
      </Portal>
    </Root>
  );
};

export default SearchMenuDialog;
