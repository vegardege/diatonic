import './TabControls.css'
import { useState } from 'react'

/**
 * A row of tabs controlling a series of panels
 */
export default function TabControls(props) {

  const [selectedTab, setSelectedTab] = useState(props.tabs[0]['id'])

  const tabs = props.tabs.map((tab, ix) => 
    <button key={tab.text}
            className={tab.id === selectedTab ? 'selected' : ''}
            role="tab"
            aria-selected={tab.id === selectedTab ? 'true': 'false'}
            aria-posinset={ix}
            aria-setsize={props.tabs.length}
            onClick={() => setSelectedTab(tab.id)}>
      {tab.text}
    </button>
  )
  const panels = props.tabs.map(tab =>
    <div style={{display: tab.id === selectedTab ? 'block' : 'none'}}
         role="tabpanel"
         aria-hidden={tab.id === selectedTab ? 'false' : 'true'}>
      {tab.panel}
    </div>
  )

  return (
  <div id="tabs">
    <div id="tabList" role="tablist" style={{width: '100%'}}>
      {tabs}
    </div>
    {panels}
  </div>
  )
}