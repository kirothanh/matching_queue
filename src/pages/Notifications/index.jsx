/* eslint-disable react/prop-types */
import TitleElement from "../../components/TitleElement";
import { useEffect, useState } from "react";
import NotificationTabs from "./NotificationTabs";
import CustomTabPanel from "../../components/CustomTabPanel";
import NotificationItem from "./NotificationItem";
import NotificationActions from "./NotificationActions";
import axios from "axios";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function Notifications() {
  const [valueTab, setValueTab] = useState(0);
  const [listNoti, setListNoti] = useState([]);
  const [listNotiNotRead, setListNotiNotRead] = useState([]);
  const user = useCurrentUser();

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    const getNoti = async () => {
      if (!user?.data?.id) {
        return <div>Loading notifications...</div>;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/notifications/${user?.data.id}`
        );
        const { data, success } = res.data;

        if (success) {
          setListNoti(data);
          setListNotiNotRead(data.filter((item) => item.is_read === false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getNoti();
  }, [user?.data?.id]);

  return (
    <>
      <div>
        <TitleElement title={"Thông báo của bạn"} />
      </div>
      <div className="max-w-[90%] mx-auto mt-[20px]">
        <div className="flex items-center justify-between border-b">
          <NotificationTabs value={valueTab} onChange={handleChange} />
          <NotificationActions />
        </div>
        <div className="mt-[20px] overflow-y-auto h-[calc(100vh-180px)] scrollbar">
          <CustomTabPanel value={valueTab} index={0} >
            <NotificationItem listNoti={listNoti} />
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1} >
            <NotificationItem listNoti={listNotiNotRead} />
          </CustomTabPanel>
        </div>
      </div>
    </>
  );
}
