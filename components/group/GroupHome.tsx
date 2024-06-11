import SortAndFilter from '../shared/SortAndFilter';
import TopRankedFilter from '../shared/TopRankedFilter';

interface IGroupHomeProps {}

const items = [
  {
    id: '1',
    itemTitle: 'Understanding JavaScript Closures',
    imageUrl: '/assets/icons/image-preview.svg',
    text: 'A deep dive into JavaScript closures, how they work, and their use cases in modern JavaScript development.',
  },
  {
    id: '2',
    itemTitle: 'Mastering Async/Await in Node.js',
    imageUrl: '/assets/icons/image-upload.svg',
    text: 'Learn how to effectively use async/await in Node.js for handling asynchronous operations with ease and better readability.',
  },
  {
    id: '3',
    itemTitle: 'React Hooks: The Complete Guide',
    imageUrl: '/assets/icons/image-preview.svg',
    text: 'An in-depth guide to React Hooks, including useState, useEffect, and custom hooks for better state and side effect management.',
  },
  {
    id: '4',
    itemTitle: 'Building RESTful APIs with Express',
    imageUrl: '/assets/icons/image-upload.svg',
    text: 'A comprehensive tutorial on building RESTful APIs using Express.js, covering routing, middleware, and best practices.',
  },
  {
    id: '5',
    itemTitle: 'Exploring GraphQL: A Better Way to Query APIs',
    imageUrl: '',
    text: 'Discover the advantages of GraphQL over REST, and learn how to set up and use GraphQL in your applications.',
  },
];

const GroupHome: React.FC<IGroupHomeProps> = (props) => {
  return (
    <div className="content-wrapper">
      <aside className="left-sidebar">
        <SortAndFilter followingCount={24} />
        <TopRankedFilter title="Top Ranked" items={items} />
      </aside>
      <main className="main-content mx-auto border">MAIN</main>
      <aside className="right-sidebar border">RIGHT</aside>
    </div>
  );
};

export default GroupHome;
