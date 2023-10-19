import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";
import NavList from "./NavList";
import React, { useContext } from "react";
import AuthPanel from "./AuthPanel";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const TopNavbar = observer(() => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { userStore } = useContext(Context);
  const isLoginRoute =
    location.pathname === LOGIN_ROUTE ||
    location.pathname === REGISTRATION_ROUTE;

  return (
    <Navbar className="sticky max-w-full overflow-hidden top-0 z-50 h-max p-2 lg:rounded-full lg:px-6 lg:py-4">
      <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={() => setIsNavOpen((cur) => !cur)}
          className=" ml-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <Typography
          as="a"
          href={HOME_ROUTE}
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Online School
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        {userStore.getIsAuth() ? (
          <ProfileMenu />
        ) : (
          !isLoginRoute && <AuthPanel />
        )}
      </div>
      <Collapse open={isNavOpen}>
        <NavList />
      </Collapse>
    </Navbar>
  );
});

export default TopNavbar;