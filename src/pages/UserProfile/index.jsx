/* eslint-disable react/prop-types */
import { Box, Tab, Tabs } from "@mui/material";
import UserInfo from "../../components/UserInfo";
import { useState } from "react";
import UserPost from "../UserPost";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{
          py: 3,
          ...(index === 1 && {
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto'
          })
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserProfile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="p-6 w-full ">
      <h2 className="text-2xl font-bold inline-block pb-1">Thông tin cá nhân</h2>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 'fit-content', marginTop: '20px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="thông tin" {...a11yProps(0)} />
          <Tab label="bài đăng" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserPost />
      </CustomTabPanel>

    </div>
  )
}
