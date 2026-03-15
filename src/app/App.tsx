import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from '@/app/router';
import { AuthProvider } from '@/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </AuthProvider>
  );
}
