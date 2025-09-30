/* eslint-disable react/prop-types */
import { TbPlayFootball } from "react-icons/tb";
import { timeAgo } from "../../utils/formatDate";

export default function NotificationItem({ listNoti }) {
  if (!listNoti.length) {
    return <div className="text-gray-500 text-center mt-5">Không có thông báo nào</div>;
  }

  return (
    <div>
      {
        listNoti?.map((noti) => (
          <div className={`mt-[10px] flex items-center justify-between ${noti?.is_read ? "bg-[#e3f2fd]" : "bg-gray-200"}  py-2 px-4 rounded-md`} key={noti?.id}>
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <TbPlayFootball className="w-7 h-7 text-[#9da3a7]" />
              </div>
            </div>
            <div className="font-medium text-[#48475e]">{noti?.title}</div>
            <div className="font-light text-[#2e2e2e]">{timeAgo(noti?.created_at)}</div>
          </div>
        ))
      }
    </div>
  );
}
