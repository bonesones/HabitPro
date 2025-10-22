export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <article className='w-full bg-white px-4 py-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3'>
    {children}
  </article>
);
