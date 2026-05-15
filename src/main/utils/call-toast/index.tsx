import { toast } from 'react-toastify';
import type { ReactNode } from 'react';
import type { ToastOptions } from 'react-toastify';

const renderToast = (
  message: ReactNode | string,
  variant: 'error' | 'loading' | 'success' | 'warning',
  options?: ToastOptions
): unknown => toast[variant](message, options);

export const callToast = {
  error: (message: ReactNode | string, options?: ToastOptions): unknown =>
    renderToast(message, 'error', options),
  loading: (message: ReactNode | string, options?: ToastOptions): unknown =>
    renderToast(message, 'loading', { autoClose: 30000, ...options }),
  success: (message: ReactNode | string, options?: ToastOptions): unknown =>
    renderToast(message, 'success', options),
  warning: (message: ReactNode | string, options?: ToastOptions): unknown =>
    renderToast(message, 'warning', options)
};
