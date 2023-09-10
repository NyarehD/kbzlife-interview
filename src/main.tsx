import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./index.css";
import ContactInformation from './pages/ContactInformation';
import PersonalInformation1 from './pages/PersonalInformation';
import Root from './pages/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/personal_information",
    element: <PersonalInformation1 />
  }
  , {
    path: "/contact_information",
    element: <ContactInformation />
  }
  , {
    path: "/mailing_information",
    element: <ContactInformation />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
