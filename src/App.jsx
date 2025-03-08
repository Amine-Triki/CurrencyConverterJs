import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import './App.css';
import { Header, Footer } from './components/index';
import { Home, CurrencyConverter, Projects, Contact, Privacy, Terms } from './pages/index';

// 🏠 إنشاء تخطيط عام يحتوي على الهيدر والفوتر
const Layout = () => (
  <>
    <Header />
    <Outlet /> {/* سيتم استبداله بالمحتوى الخاص بكل صفحة */}
    <Footer />
  </>
);

// 🔄 تعريف التوجيهات الجديدة باستخدام createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 🏠 جميع الصفحات ستكون داخل Layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/currencyConverter", element: <CurrencyConverter /> },
      { path: "/contact", element: <Contact /> },
      { path: "/projects", element: <Projects /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
    ],
  },
]);

// 🏠 التطبيق الرئيسي
function App() {
  return <RouterProvider router={router} />;
}

export default App;
