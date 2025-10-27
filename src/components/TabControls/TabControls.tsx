import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./TabControls.module.css";

interface Tab {
  id: string;
  text: string;
  panel: ReactNode;
}

interface TabControlsProps {
  tabs: Tab[];
}

/**
 * A row of tabs controlling a series of panels
 */
export default function TabControls(props: TabControlsProps) {
  const [selectedTab, setSelectedTab] = useState(props.tabs[0]?.id ?? "");

  const tabs = props.tabs.map((tab, ix) => (
    <button
      type="button"
      key={tab.text}
      className={tab.id === selectedTab ? styles.selected : ""}
      role="tab"
      aria-selected={tab.id === selectedTab ? "true" : "false"}
      aria-posinset={ix}
      aria-setsize={props.tabs.length}
      onClick={() => setSelectedTab(tab.id)}
    >
      {tab.text}
    </button>
  ));

  const panels = props.tabs.map((tab) => (
    <div
      key={tab.id}
      style={{ display: tab.id === selectedTab ? "block" : "none" }}
      role="tabpanel"
      aria-hidden={tab.id === selectedTab ? "false" : "true"}
    >
      {tab.panel}
    </div>
  ));

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" style={{ width: "100%" }}>
        {tabs}
      </div>
      {panels}
    </div>
  );
}
