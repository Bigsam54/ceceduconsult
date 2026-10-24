import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { TeacherProfileProvider } from './context/TeacherProfileContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <TeacherProfileProvider>
          <App />
        </TeacherProfileProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
