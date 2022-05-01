import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Tab,
  Tabs,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logout from "@mui/icons-material/Logout";
import { pink } from "@mui/material/colors";

import RegisterModal from "./user/RegisterModal";
import LoginModal from "./user/LoginModal";
import { UserContext } from "./user/reducer/userReducer";
import "../scss/Header.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Header({ user }) {
  const navigate = useNavigate();
  const { userState, userDispatch } = useContext(UserContext);
  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    userDispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };
  // modal 관리
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  const [openRegister, setOpenRegister] = React.useState(false);
  const handleRegisterOpen = () => setOpenRegister(true);
  const handleRegisterClose = () => setOpenRegister(false);

  //style
  const linkTabstyle = { width: "130px" };

  // 탭 관리
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // user nav
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <nav className="navbar">
        <div className="navbarAccount">
          {isLogin ? (
            <>
              <Link className="navbarButton">
                {userState.user.name}
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={(e) => {
                      anchorEl
                        ? setAnchorEl(null)
                        : setAnchorEl(e.currentTarget);
                    }}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={isMenuOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? "true" : undefined}
                  >
                    <ArrowDropDownIcon
                      sx={{ width: 32, height: 32, color: pink[500] }}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={isMenuOpen}
                      // onClose={handleClose}
                      // onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/account");
                        }}
                      >
                        My account
                      </MenuItem>
                      <Divider />
                      <MenuItem>Add another account</MenuItem>
                      <MenuItem>Settings</MenuItem>
                      <MenuItem onClick={logout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </IconButton>
                </Tooltip>
              </Link>

              {/* <span>/</span>
              <Link onClick={logout} className="account">
                Log Out
              </Link> */}
            </>
          ) : (
            <>
              <Link onClick={handleLoginOpen} className="account">
                Log In
              </Link>
              <span>/</span>
              <Link onClick={handleRegisterOpen} className="account">
                Sign Up
              </Link>
              )
            </>
          )}
        </div>
        <LoginModal handleLoginClose={handleLoginClose} open={openLogin} />
        <RegisterModal
          handleRegisterClose={handleRegisterClose}
          open={openRegister}
        />
        <div className="navbarLogo">
          <Link color="white" underline="none">
            저쪽 손님께서
            <br />
            보내신 겁니다
          </Link>
        </div>

        <Box sx={{ width: "100%", typography: "body1" }} className="navbarMenu">
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            indicatorColor="primary"
            textColor="inherit"
          >
            <LinkTab
              sx={linkTabstyle}
              className="navbarButton"
              label="Home"
              value="1"
              onClick={() => {
                navigate("/");
              }}
            />
            <LinkTab
              sx={linkTabstyle}
              className="navbarButton"
              label="Introduce"
              value="2"
              onClick={() => {
                navigate("/introduce");
              }}
            />
            <LinkTab
              sx={linkTabstyle}
              className="navbarButton"
              label="Dictionary"
              value="3"
              onClick={() => {
                navigate("/dictionary");
              }}
            />
            <LinkTab
              sx={linkTabstyle}
              className="navbarButton"
              label="Quiz"
              value="4"
              onClick={() => {
                navigate("/quiz");
              }}
            />
            <LinkTab
              sx={linkTabstyle}
              className="navbarButton"
              label="Community"
              value="5"
              onClick={() => {
                navigate("/community");
              }}
            />
          </Tabs>
        </Box>
      </nav>
    </ThemeProvider>
  );
}

export default Header;
