import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";
import ContactInformation from './pages/ContactInformation';
import MailingInformation from './pages/MailingInformation';
import PersonalInformation1 from './pages/PersonalInformation';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/personal-information",
    element: <PersonalInformation1 />
  }
  , {
    path: "/contact-information",
    element: <ContactInformation />
  }
  , {
    path: "/mailing-information",
    element: <MailingInformation />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
