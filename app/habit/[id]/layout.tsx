import { Header } from '@/pages/Dashboard';

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default SiteLayout;
