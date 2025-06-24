import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineStadium } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getMatches, updateUsersJoin } from "../../store/slices/matchesSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import TitleElement from "../../components/TitleElement";
import { io } from "socket.io-client";
import { postNoti } from "../../store/slices/notificationsSlice";
import Loading from "../../components/Loading";
import JoinMatchModal from "../../components/JoinMatchModal";
import useCurrentUser from "../../hooks/useCurrentUser";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

const getDetailPartner = (match) => {
  const findPartner = match?.usersJoin?.find(
    (user) => user?.id === match?.partner_id
  );
  return findPartner;
};

export default function Matching() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const matches = useSelector((state) => state.matches.matchesValue);
  const loading = useSelector((state) => state.matches.loading);
  const modifiedMatches = useSelector((state) => state.matches.modifiedMatches);
  // console.log('modifiedMatches: ', modifiedMatches)
  const user = useCurrentUser();
  const [openJoinMatchModal, setOpenJoinMatchModal] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  // const user = useCurrentUser();

  // const handleJoinMatch = async (matchId, partnerId) => {
  //   if (!partnerId) {
  //     toast.error("User data is not available yet.");
  //     return;
  //   }

  //   try {
  //     const res = await authorizedAxiosInstance.post("/matches/join", {
  //       id: matchId,
  //       partner_id: partnerId,
  //     });

  //     if (res.data.success) {
  //       toast.success(res.data.message);

  //       socket.emit("joinRoom", { matchId, partnerId });
  //     }

  //     const listUserMatch = res.data.listUserMatch;
  //     dispatch(updateUsersJoin({ matchId, usersJoin: listUserMatch }));
  //   } catch (error) {
  //     if (error.status === 404) {
  //       navigate("/club/create");
  //     }
  //   }
  // };

  useEffect(() => {
    if (modifiedMatches && user?.data?.id) {
      Object.values(modifiedMatches)
        .flat()
        .forEach((match) => {
          if (
            match.createdBy === user?.data?.id ||
            match.usersJoin?.some((user) => user.id === user?.data?.id)
          ) {
            socket.emit("joinRoom", { matchId: match.id });
          }
        });
    }
  }, [modifiedMatches, user?.data?.id]);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  useEffect(() => {
    socket.on("userJoined", ({ message, matchId, users }) => {
      const notification = {
        userId: user?.data?.id,
        title: message,
      };
      dispatch(postNoti(notification));
      dispatch(updateUsersJoin({ matchId, usersJoin: users }));
    });

    socket.on("matchCreated", (newMatch) => {
      const formattedDate = moment
        .utc(newMatch.matchDate)
        .local()
        .format("DD/MM/YYYY");
      const message = `Trận đấu mới vào ngày ${formattedDate} vừa được tạo!`;

      const notification = {
        userId: user?.data.id,
        title: message,
      };

      dispatch(postNoti(notification));
      // dispatch(addMatch(newMatch));
    });

    socket.on("partnerConfirmed", ({ message }) => {
      const notification = {
        userId: user?.data?.id,
        title: message,
      };
      dispatch(postNoti(notification));
      dispatch(getMatches());
    });

    return () => {
      socket.off("userJoined");
      socket.off("matchCreated");
      socket.off("partnerConfirmed");
    };
  }, [user?.data, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <TitleElement title={"Matching"} />

      <div className="mt-[20px]">
        <div className="flex item-center justify-end mr-3">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3b8a58", marginRight: "10px", zIndex: 0 }}
            onClick={() => navigate("/matching/manage-match")}
          >
            Quản lý trận bóng
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#37003c", marginRight: "10px" }}
            onClick={() => navigate("/matching/create")}
          >
            Tạo trận bóng
          </Button>
        </div>
      </div>
      <div className="mt-[20px] overflow-y-auto h-[calc(100vh-160px)] scrollbar">
        {Object.keys(modifiedMatches)
          .sort((a, b) => moment(b).valueOf() - moment(a).valueOf())
          .map((key) => {
            const isPast = moment(key).isBefore(moment(), "day");
            return (
              <div className="mt-[20px]" key={key}>
                <h3 className="ml-[40px] my-2 transform text-xl font-bold text-[#37003c]">
                  {moment(key).format("DD/MM/YYYY")}
                  {isPast && (
                    <span className="text-red-500 text-sm ml-2">
                      (Ngày đã qua)
                    </span>
                  )}
                </h3>
                {modifiedMatches[key].map((match) => (
                  <div
                    className="mt-[20px] max-w-[90%] mx-auto border-b-[1px] pb-2"
                    key={match.id}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-4 hover:bg-gradient-to-r from-[#05f0ff] via-[#7367ff] to-[#872eed] w-full p-2 rounded-md cursor-pointer hover:text-white group">
                      <div className="font-semibold text-[20px] text-center">
                        {match?.club?.name}
                      </div>
                      <div className="flex justify-center items-center gap-[10px]">
                        <div className="flex justify-center items-center gap-[10px] ">
                          <img
                            src={match?.club?.imageUrl}
                            className="w-[30px] "
                          />
                        </div>
                        <div className="border py-1 px-2 rounded-md">
                          {moment(match.matchTime, "HH:mm:ss").format("HH:mm")}
                        </div>
                        {getDetailPartner(match)?.imageUrl ? (
                          <Avatar
                            sx={{
                              width: "29px",
                              height: "29px",
                            }}
                            alt={getDetailPartner(match)?.name}
                            src={getDetailPartner(match)?.imageUrl}
                          />
                        ) : (
                          <div>
                            <AvatarGroup
                              max={4}
                              sx={{
                                "& .MuiAvatar-root": {
                                  width: "29px",
                                  height: "29px",
                                  fontSize: "0.8rem",
                                  zIndex: 0,
                                },
                              }}
                            >
                              {match?.usersJoin?.map((partner) => (
                                <Avatar
                                  key={partner?.id}
                                  alt="Remy Sharp"
                                  src={partner?.imageUrl}
                                />
                              ))}
                            </AvatarGroup>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center items-center gap-[10px]">
                        <MdOutlineStadium className="text-lg" />
                        <span className="text-md">{match.stadium?.name}</span>
                      </div>
                      <button
                        className={`border border-gray-300 py-1 px-4 rounded capitalize ${isPast
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-[#00a3d9] text-white group-hover:bg-white group-hover:text-[#37003c]"
                          }`}
                        disabled={isPast}
                        onClick={() => navigate(`/matching/${match.id}`)}
                      >
                        Detail
                      </button>
                      <div className="flex justify-center items-center gap-[10px] mr-2">
                        {match?.usersJoin?.some(
                          (item) => item.createdBy === user?.data?.id
                        ) || match?.createdBy === user?.data?.id ? (
                          <span className="text-green-500 font-semibold">
                            Already Joined
                          </span>
                        ) : (
                          <>

                            <button
                              className={`border border-gray-300 text-black py-1 px-4 rounded capitalize ${isPast
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "group-hover:bg-white group-hover:text-[#37003c]"
                                }`}
                              disabled={isPast}
                              onClick={
                                () => {
                                  setSelectedMatchId(match.id);
                                  setOpenJoinMatchModal(true);
                                }
                                // handleJoinMatch(match.id, user?.data.id)
                              }
                            >
                              Join
                            </button>

                            <JoinMatchModal
                              open={openJoinMatchModal}
                              onClose={() => setOpenJoinMatchModal(false)}
                              matchId={selectedMatchId}
                            />
                            {!isPast && (
                              <FaArrowRightLong className="group-hover:translate-x-2 transition-transform duration-300" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}
