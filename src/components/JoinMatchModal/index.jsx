/* eslint-disable react/prop-types */
import { Backdrop, Box, Button, Fade, Modal, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import useCurrentUser from "../../hooks/useCurrentUser";
import { getClubsByUserId, joinMatch } from "../../api";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { updateUsersJoin } from "../../store/slices/matchesSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: '90%',
    sm: '70%',
    md: '50%',
    lg: '40%'
  },
  maxWidth: '600px',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

const JoinMatchModal = ({ open, onClose, matchId }) => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('');
  const user = useCurrentUser();
  const dispatch = useDispatch();

  const handleTeamChange = (event) => {
    setSelectedClub(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await joinMatch(matchId, user.data?.id, selectedClub);
    if (res.data.success) {
      toast.success(res.data.message);
      socket.emit("joinRoom", { matchId, partnerId: user.data?.id });
      dispatch(updateUsersJoin({ matchId, usersJoin: res.data.matchParticipants }));
      onClose();
    } else {
      toast.error(res.data.message);
    }
  }

  useEffect(() => {
    if (user) {
      const fetchClubs = async () => {
        const res = await getClubsByUserId(user.data?.id);
        if (res.data.success) {
          setClubs(res.data.data);
          if (res.data.data.length > 0) {
            setSelectedClub(String(res.data.data[0]?.id));
          }
        }
      };
      fetchClubs();
    }
  }, [user]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Xác nhận tham gia trận đấu
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="team-select-label">Đội tham gia</InputLabel>
                <Select
                  labelId="team-select-label"
                  id="team-select"
                  value={selectedClub}
                  label="Đội tham gia"
                  onChange={handleTeamChange}
                >
                  {clubs?.map((club) => (
                    <MenuItem key={club.id} value={club.id}>
                      {club.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Button variant="outlined" onClick={onClose}>
                  Hủy
                </Button>
                <Button variant="contained" type="submit">
                  Tham gia
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default JoinMatchModal