import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
} from "react-icons/fa";

import useAuthStore from "../../store/auth.store";
import useLayoutStore from "../../store/layout.store";

import { menus } from "../../routes/menuConfig";

export default function Sidebar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const {
    sidebarCollapsed,
    mobileOpen,
    closeMobile,
  } = useLayoutStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-30 bg-black/50 lg:hidden
          "
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          fixed lg:static z-40
          bg-slate-900 text-white
          min-h-screen transition-all duration-300

          ${
            sidebarCollapsed
              ? "w-20"
              : "w-64"
          }

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="p-6 border-b border-slate-700">
          <h1
            className={`font-bold ${
              sidebarCollapsed
                ? "text-lg"
                : "text-2xl"
            }`}
          >
            {sidebarCollapsed
              ? "AT"
              : "AccountingTracker"}
          </h1>

          {!sidebarCollapsed && (
            <p className="text-sm text-slate-400">
              {user?.role}
            </p>
          )}
        </div>

        <nav className="p-4 flex-1 space-y-2">
          {menus
            .filter(
              (menu) =>
                !menu.roles ||
                menu.roles.includes(user?.role)
            )
            .map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-4 py-3 rounded-lg
                    transition

                    ${
                      isActive
                        ? "bg-blue-600"
                        : "hover:bg-slate-800"
                    }
                  `
                  }
                >
                  <Icon size={18} />

                  {!sidebarCollapsed &&
                    menu.title}
                </NavLink>
              );
            })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3
              px-4 py-3 rounded-lg
              hover:bg-red-600
            "
          >
            <FaSignOutAlt />

            {!sidebarCollapsed &&
              "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}