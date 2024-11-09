import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, CalendarArrowDown, ChartNoAxesCombined } from "lucide-react";

// Sidebar menu items
export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />,
  },
  {
    id: 'product',
    label: 'Product',
    path: '/admin/product',
    icon: <ShoppingCart />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <CalendarArrowDown />,
  },
];

// MenuItems Component to render the sidebar menu
function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-3">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {navigate(menuItem.path)
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 rounded-md px-3 py-7 text-muted-foreground hover:bg-muted hover:text-blue-500 cursor-pointer"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

// Sidebar Component (with open and setOpen props)
const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Background overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-white transition-transform duration-300 transform ${open ? "translate-x-0" : "-translate-x-64"} z-40`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button onClick={() => setOpen(false)} className="text-lg">×</button>
          </div>
          <MenuItems setOpen={setOpen}/>
        </div>
      </div>

      {/* Static Sidebar (desktop view) */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-3xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default Sidebar;
