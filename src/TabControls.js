import './TabControls.css'
import { useState } from 'react'
import Button from './Button.js'

/**
 * A row of tabs controlling a series of panels
 */
export default function TabControls(props) {

  const [selectedTab, setSelectedTab] = useState(props.tabs[0]['id'])

  const tabs = props.tabs.map(tab => 
    <Button className={tab.id === selectedTab ? 'selected' : ''}
            text={tab.text}
            onClick={() => setSelectedTab(tab.id)} />
  )
  const panels = props.tabs.map(tab =>
    <div style={{display: tab.id === selectedTab ? 'block' : 'none'}}>
      {tab.panel}
    </div>
  )

  return (
  <div id="tabs">
    <div id="tabList" style={{width: '100%'}}>
      {tabs}
    </div>
    {panels}
  </div>
  )
}