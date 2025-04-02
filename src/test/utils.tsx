import {ReactElement, ReactNode} from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Custom render function that includes providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options });

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

export * from '@testing-library/react';
export { customRender as render };
