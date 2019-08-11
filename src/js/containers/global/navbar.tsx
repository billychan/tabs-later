import * as React from 'react';
import { NavLink, NavLinkProps} from 'react-router-dom';

interface AppNavLinkProps extends NavLinkProps{
  text: string;
}

const AppNavLink = ({text, ...props }: AppNavLinkProps) => (
  <NavLink
    className="
      w-1/2
      flex
      font-bold
      items-center justify-center
      border-t border-b border-gray-200
      hover:bg-blue-500 hover:text-white hover:no-underline
    "
    activeClassName="bg-blue-400 text-white"
    {...props}
    isActive={(match) => {
      return !!match;
    }}
  >
    <span>{text}</span>
  </NavLink>
);

const NavBar = () => (
  <div className="h-10 w-full flex">
    <AppNavLink to="/" text="Tabs" exact />
    <AppNavLink to="/lists" text="Lists" />
  </div>
)

export default NavBar;