import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onMenuClick = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  const onCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className={styles.shell}>
      <div className={styles.headerRow}>
        <Header
          onMenuClick={onMenuClick}
          isMenuOpen={sidebarOpen}
        />
      </div>
      <div className={styles.body}>
        <Sidebar
          open={sidebarOpen}
          onClose={onCloseSidebar}
        />
        <div className={styles.main}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
