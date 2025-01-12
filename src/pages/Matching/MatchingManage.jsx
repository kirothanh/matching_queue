import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TitleElement from "../../components/TitleElement";
import { useEffect, useState } from "react";
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { toast } from "react-toastify";
import moment from "moment";

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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

export default function MatchingManage() {
  const [matchesUser, setMatchesUser] = useState([]);

  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

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
                matchesUser.length > 0 ? matchesUser.map((match, index) => (
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
                      <Button variant="contained" size="small" sx={{ backgroundColor: "#85110b" }}>Hủy trận</Button>
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
    </div>
  )
}
