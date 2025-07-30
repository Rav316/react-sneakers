import styles from './outlet-profile.module.scss';

import { Outlet } from 'react-router';
import { useState } from 'react';

export const OutletProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        <span
          className={activeTab === "profile" ? styles.active : ""}
          onClick={() => setActiveTab("profile")}
        >
          Профиль
        </span>
        <span
          className={activeTab === "orders" ? styles.active : ""}
          onClick={() => setActiveTab("orders")}
        >
          Заказы
        </span>
      </div>
      <Outlet />
    </div>
  );
};