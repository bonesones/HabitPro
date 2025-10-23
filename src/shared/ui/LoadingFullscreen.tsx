import { Loading } from './Loading';

export const LoadingFullscreen: React.FC = () => (
  <div className='h-[calc(100vh-4rem)] flex justify-center items-center'>
    <Loading className='bg-blue-500' />
  </div>
);
