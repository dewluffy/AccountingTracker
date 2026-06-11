import {
  FaBars,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";

import useAuthStore from "../../store/auth.store";
import useLayoutStore from "../../store/layout.store";

import { menus } from "../../routes/menuConfig";

export default function Navbar() {
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user
  );

  const {
    toggleSidebar,
    toggleMobile,
    sidebarCollapsed,
  } = useLayoutStore();

  const currentPage =
    menus.find(
      (menu) =>
        menu.path === location.pathname
    )?.title || "AccountingTracker";

  return (
    <header
      className="
        h-16 bg-white border-b px-6
        flex items-center justify-between
      "
    >
      <div className="flex items-center gap-4">

        {/* Mobile */}
        <button
          onClick={toggleMobile}
          className="lg:hidden"
        >
          <FaBars />
        </button>

        {/* Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block"
        >
          {sidebarCollapsed
            ? <FaAngleDoubleRight />
            : <FaAngleDoubleLeft />}
        </button>

        <h2 className="font-semibold text-xl">
          {currentPage}
        </h2>
      </div>

      <div className="text-right">
        <p className="font-medium">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
      </div>
    </header>
  );
}