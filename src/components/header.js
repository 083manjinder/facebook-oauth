import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../redux/userReducer";




function Header() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = async() => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        window.FB.logout(function (response) {
          if (response.status === "unknown") {
             dispatch(saveUser({}))
            
            navigate("/login");
          }
        });
      }
    });
  };
  return (
    <>
      <Navbar className="bg-primary ">
        <NavbarBrand
          href="/"
          className="logo text-white text-centre text-decoration-none"
        >
          <h1>facebook</h1>
        </NavbarBrand>
        <Nav>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <img
                className="rounded-circle"
                src={user?.picture?.data?.url}
              ></img>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <NavbarText>{user?.name}</NavbarText>
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <NavbarText>Logout</NavbarText>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
