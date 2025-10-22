import { Header } from '@/pages/Dashboard';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Layout;
