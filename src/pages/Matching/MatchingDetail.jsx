import { IoIosSend } from "react-icons/io";
import TitleElement from "../../components/TitleElement";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMatches } from "../../store/slices/matchesSlice";
import moment from "moment";
import { MdOutlineStadium } from "react-icons/md";
import { io } from "socket.io-client";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { toast } from "react-toastify";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addNotification } from "../../store/slices/notificationsSlice";
import useCurrentUser from "../../hooks/useCurrentUser";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

export default function MatchingDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useCurrentUser();
  const modifiedMatches = useSelector((state) => state.matches.matchesValue);
  const loading = useSelector((state) => state.matches.loading);
  const [listClub, setListClub] = useState([]);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [partner, setPartner] = useState("");
  const [detailPartner, setDetailPartner] = useState("");
  const chatContentRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const res = await authorizedAxiosInstance.post(
        "/chat/sendMessagesGroup",
        {
          roomId: listClub?.id,
          message,
          senderId: user?.data?.id,
        }
      );

      if (res.data.success) {
        setMessage("");
        toast.success(res.data.message);
      }
    }
  };

  const handleChangeSelectPartner = (e) => {
    setPartner(e.target.value);
  };

  const handleSelectPartner = async (event) => {
    event.preventDefault();
    if (partner) {
      try {
        console.log('Confirming partner:', { partnerId: partner, matchId: listClub?.id });
        const res = await authorizedAxiosInstance.post(
          "/matches/confirm-partner",
          {
            partnerId: partner,
            matchId: listClub?.id,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          console.log('Partner confirmed successfully, refreshing matches...');
          dispatch(getMatches());

          // Đợi 1 giây để đảm bảo data được cập nhật
          setTimeout(() => {
            // Hoặc force reload hoàn toàn:
            window.location.href = '/matching';
          }, 1000);
        }
      } catch (error) {
        console.error('Error confirming partner:', error);
        toast.error("Failed to confirm partner");
      }
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await authorizedAxiosInstance.get(
          `/chat/room/${listClub?.id}`
        );
        if (res.data.success) {
          setMessageList(res.data.data);
        }
      } catch (error) {
        toast.error("Failed to load messages");
      }
    };

    if (listClub?.id) {
      getMessages();
    }
  }, [listClub?.id]);

  useEffect(() => {
    const findClubs = modifiedMatches.find((match) => match.id === Number(id));
    setListClub(findClubs);
  }, [modifiedMatches, id]);

  console.log('modifiedMatches: ', modifiedMatches);
  console.log('listClub: ', listClub);
  console.log('listClub?.usersJoin: ', listClub?.usersJoin);

  useEffect(() => {
    socket.on("partnerConfirmed", ({ message }) => {
      dispatch(addNotification({ message }));
      // toast.success(data.message);
      dispatch(getMatches());
    })

    return () => {
      socket.off("partnerConfirmed");
    };
  }, [dispatch]);

  useEffect(() => {
    socket.emit("joinRoom", { matchId: id });

    socket.on("new_message", (data) => {
      const messageWithUserInfo = {
        ...data,
        sender: data.senderId === user?.data?.id ? { ...user?.data } : data.sender,
      };
      setMessageList((prev) => [...prev, messageWithUserInfo]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    const findPartnerDetail = listClub?.usersJoin?.find(
      (user) => user.id === listClub?.partner_id
    );
    if (findPartnerDetail) {
      setDetailPartner(findPartnerDetail);
    }
  }, [listClub]);

  // Add loading check
  if (loading || !listClub) {
    console.log('Loading state:', { loading, listClub: !!listClub });
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  console.log('Rendering component with:', {
    listClubId: listClub?.id,
    usersJoinCount: listClub?.usersJoin?.length,
    partner_id: listClub?.partner_id
  });

  try {
    return (
      <div>
        <TitleElement title={"Chi tiết trận đấu"} />
        <div className="max-w-[1300px] mx-auto p-3 h-full overflow-hidden">
          <div className="flex flex-col md:flex-row gap-2 scrollbar">
            {/* Sidebar */}
            <div className="w-full md:w-1/2 h-full flex-grow flex-col">
              <div className="bg-[#cbdbf1] rounded-lg h-full w-full flex-grow">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold text-black">
                    Match {listClub?.id}
                  </h2>
                </div>
                <div className="flex items-center flex-col py-2">
                  <div className="flex items-center justify-center py-3 gap-2">
                    <img
                      src={listClub?.club?.imageUrl}
                      className="rounded-full w-11 h-11 object-cover"
                      alt="Club"
                    />
                    <p>VS</p>
                    <img
                      src={detailPartner?.imageUrl || "/img/ball.webp"}
                      className="rounded-full w-11 h-11 object-cover"
                      alt="Partner"
                    />
                  </div>
                  <div className="inline-block border border-black py-1 px-2 rounded-md">
                    {moment(listClub?.matchTime, "HH:mm:ss").format("HH:mm")}
                  </div>
                  <div className="flex justify-center items-center gap-[10px] mt-2">
                    <MdOutlineStadium className="text-lg" />
                    <span className="text-md">{listClub?.stadium?.name}</span>
                  </div>
                </div>

                {user?.data?.id === listClub?.createdBy ? (
                  <>
                    <div className="p-4 border-b">
                      <h2 className="text-xl font-semibold text-black">
                        Select Partner
                      </h2>
                    </div>
                    <form
                      onSubmit={handleSelectPartner}
                      className="flex flex-col items-center justify-center px-4 py-2"
                    >
                      <FormControl
                        variant="standard"
                        sx={{
                          width: "100%",
                          marginBottom: "10px",
                          color: "#37003c",
                        }}
                        disabled={Boolean(listClub?.partner_id)}
                      >
                        <InputLabel
                          id="demo-simple-select-standard-label"
                          sx={{ color: "#37003c" }}
                        >
                          Chọn đối thủ
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={partner}
                          onChange={handleChangeSelectPartner}
                          label="Chọn đối thủ"
                          sx={{
                            width: "100%",
                            "& .MuiSelect-select": {
                              color: "#37003c",
                            },
                          }}
                        >
                          {listClub?.usersJoin?.length > 0 ? (
                            listClub?.usersJoin?.map((club) => (
                              <MenuItem key={club?.id} value={club?.id}>
                                {club?.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="null">
                              <em>Không có đối thủ</em>
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "100%", backgroundColor: "#70c2b4" }}
                        disabled={Boolean(listClub?.partner_id)}
                      >
                        Confirm
                      </Button>
                    </form>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="bg-[#cbdbf1] rounded-lg h-full w-full mt-2 overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold text-black">
                    Clubs Joined
                  </h2>
                </div>
                <div className="overflow-y-auto rounded-lg text-black">
                  {listClub?.usersJoin?.length > 0 ? (
                    listClub?.usersJoin?.map((club) => (
                      <div
                        className="flex items-center gap-2 px-4 py-3"
                        key={club.id}
                      >
                        <img
                          src={club?.imageUrl}
                          className="rounded-full w-8 h-8 object-cover"
                          alt={club?.name}
                        />
                        <p className="text-md font-semibold">{club?.name} </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center mt-3 font-semibold word-wrap text-[#38003d]">
                      Chưa có đội nào
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Chat container */}
            <div className="w-full bg-[#f5f7fa] flex flex-col h-[80vh] rounded-lg">
              {/* Header */}
              <div className="p-4 bg-[#153b82] text-white rounded-t-lg">
                <h2 className="text-xl font-semibold">Discussions</h2>
              </div>

              {/* Chat Content */}
              <div
                ref={chatContentRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messageList?.map((msg, index) => (
                  <div
                    key={`${msg?.id}-${index}`}
                    className={`flex items-start gap-2 ${msg?.senderId === user?.data?.id ? "justify-end" : ""
                      }`}
                  >
                    {msg.senderId !== user?.data?.id && (
                      <img
                        src={msg?.sender?.avatar || "/img/avatar.png"}
                        alt="avatar"
                        className="rounded-full w-12 h-12 object-cover"
                      />
                    )}

                    <div
                      className={`flex flex-col ${msg?.senderId === user?.data?.id
                        ? "items-end"
                        : "items-start"
                        } `}
                    >
                      <p
                        className={`text-md px-4 py-1 rounded-full break-words ${msg?.senderId === user?.data?.id
                          ? "bg-[#0d6dfc] text-white"
                          : "bg-[#d9dadc]"
                          }`}
                      >
                        {msg?.message}
                      </p>
                      <span className="text-xs text-gray-500 mt-1">
                        {moment(msg?.created_at).format("HH:mm")}
                      </span>
                    </div>

                    {msg?.senderId === user?.data?.id && (
                      <img
                        src={user?.data?.avatar || "/img/avatar.png"}
                        alt="avatar"
                        className="rounded-full w-12 h-12 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Input Section */}
              <div className="p-4 border-t border-gray-200">
                <form className="flex space-x-4" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <span>Send</span>
                    <IoIosSend className="text-xl" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering component:', error);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">Error rendering component: {error.message}</div>
      </div>
    );
  }
}
