export function sideNavRoutes() {
  return [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: "border-all"
    },
    {
      name: "My Tasks",
      route: "/task-list",
      icon: "align-justify"
    },
    {
      name: "My Calendar",
      route: "/my-calendar",
      icon: ["far", "calendar"]
    },
    {
      name: "My Profile",
      route: "/my-profile",
      icon: ["far", "user-circle"]
    },
    {
      name: "Change Password",
      route: "/change-password",
      icon: "key"
    },
    {
      name: "Logout",
      route: "/logout",
      icon: "sign-out-alt"
    }
  ];
}
