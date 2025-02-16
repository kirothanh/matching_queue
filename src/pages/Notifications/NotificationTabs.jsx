/* eslint-disable react/prop-types */
import { Tab, Tabs } from "@mui/material"

export default function NotificationTabs({ value, onChange }) {
  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  })

  return (
    <Tabs value={value} onChange={onChange} aria-label="basic tabs example">
      <Tab label="Tất cả" {...a11yProps(0)} />
      <Tab label="Chưa đọc" {...a11yProps(1)} />
    </Tabs>
  )
}
