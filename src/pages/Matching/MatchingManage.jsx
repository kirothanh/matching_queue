import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TitleElement from "../../components/TitleElement";
import { useEffect, useState } from "react";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { toast } from "react-toastify";
import moment from "moment";
import ModalDeleteClient from "../../components/ModalDeleteClient";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#35023b',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function MatchingManage() {
  const [open, setOpen] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [matchesUser, setMatchesUser] = useState([]);

  const handleCancelMatch = async (matchId) => {
    setSelectedMatchId(matchId);
    setOpen(true);
  }

  const handleConfirmDelete = async () => {
    try {
      const response = await authorizedAxiosInstance.delete(`/matches/manage-match/${selectedMatchId}`);
      if (response.data.success) {
        toast.success("Đã hủy trận đấu thành công");
        const res = await authorizedAxiosInstance.get(`/matches/manage-match`);
        setMatchesUser(res.data.matchesByUser);
      } else {
        toast.error(response.data.message || "Không thể hủy trận đấu");
      }
    } catch (error) {
      console.error("Error deleting match:", error);
      toast.error("Đã xảy ra lỗi khi hủy trận đấu");
    }
  }

  useEffect(() => {
    const getMatchesByUser = async () => {
      const res = await authorizedAxiosInstance.get("/matches/manage-match")
      setMatchesUser(res.data.matchesByUser)
      if (res.data.success) {
        toast.success(res.data.message)
      }
    }
    getMatchesByUser()
  }, [])

  return (
    <div>
      <TitleElement title={"Quản lý trận bóng của bạn"} />

      <div className="mt-8 max-w-[1300px] mx-auto px-[10px]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>STT</StyledTableCell>
                <StyledTableCell>Đội của bạn</StyledTableCell>
                <StyledTableCell>Đá tại sân</StyledTableCell>
                <StyledTableCell>Thời gian</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                matchesUser?.length > 0 ? matchesUser.map((match, index) => (
                  <StyledTableRow key={match.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {match.club.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {match.stadium.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {moment(match.matchTime, "HH:mm:ss").format("HH:mm")}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Button variant="contained" size="small" onClick={() => handleCancelMatch(match?.id)} sx={{ backgroundColor: "#85110b" }}>Hủy trận</Button>
                    </StyledTableCell>
                  </StyledTableRow>

                )) : <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center" style={{ textAlign: "center", padding: "20px" }}>
                    Không có dữ liệu trận đấu của bạn
                  </StyledTableCell>
                </StyledTableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ModalDeleteClient open={open} setOpen={setOpen} onConfirm={handleConfirmDelete} confirmButtonColor="error" />
    </div>
  )
}
