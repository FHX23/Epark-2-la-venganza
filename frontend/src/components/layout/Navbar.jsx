import { NavLink, useNavigate } from "react-router-dom";
import { logout, profile } from "@/services/auth.service.js";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import profileImage from "@/assets/png/avatar.png";

import {
  Car,
  Copyright,
  LayoutDashboard,
  MessageCircleQuestion,
  PanelsTopLeft,
  Paperclip,
  ParkingMeter,
  ParkingSquare,
  Settings,
  User,
  Users,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const logoutSubmit = () => {
    try {
      logout();
      toast({
        title: "Cerraste sesión correctamente",
      });
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const [userProfile, setUserProfile] = useState({
    rolName: "",
  });

  const dataProfile = async () => {
    try {
      const { data } = await profile();
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    dataProfile();
  }, []);

  useEffect(() => {
    dataProfile();
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-4 px-2.5 text-xl bg-gray-50 py-4 rounded-lg"
      : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex ">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              to="/home"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <ParkingMeter className="h-4 w-4 transition-all group-hover:scale-150" />
              <span className="sr-only">Epark</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/home"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            {userProfile.rolName === "usuario" && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/vehicle/GetByLicensePlate"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <Car className="h-5 w-5" />
                      <span className="sr-only">Vehiculos</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Vehiculos</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/support/dashboard"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <MessageCircleQuestion className="h-5 w-5" />
                      <span className="sr-only">Soporte</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Soporte</TooltipContent>
                </Tooltip>
              </>
            )}
            {userProfile.rolName === "administrador" && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/users"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <Users className="h-5 w-5" />
                      <span className="sr-only">Usuarios</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Usuarios</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/vehicle/dashboard"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <Car className="h-5 w-5" />
                      <span className="sr-only">Vehiculos</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Vehiculos</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/upload/dashboard"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <Paperclip className="h-5 w-5" />
                      <span className="sr-only">Ver Documentacion</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Ver Documentacion
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/quadrants/dashboard"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <Copyright className="h-5 w-5 " />
                      <span className="sr-only">Cuadrantes</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Cuadrantes</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/parking-spots"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <ParkingSquare className="h-5 w-5" />
                      <span className="sr-only">Estacionamientos</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Estacionamientos</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/support/dashboard"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      prefetch={false}
                    >
                      <MessageCircleQuestion className="h-5 w-5" />
                      <span className="sr-only">Soporte</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Soporte</TooltipContent>
                </Tooltip>
              </>
            )}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={profileImage}
                    width="96"
                    height="96"
                    alt="Avatar"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <NavLink to="/profile">Mi Perfil</NavLink>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <NavLink to="/settings">Ajustes</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutSubmit}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Ajustes</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ajustes</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
};

export default Navbar;
