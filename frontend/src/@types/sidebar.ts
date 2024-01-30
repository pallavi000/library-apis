export type SidebarTitle =
  | "Dashboard"
  | "Users"
  | "Books"
  | "Genres"
  | "Authors"
  | "Borrows"
  | "Membership";

export type SidebarPath =
  | "/admin/dashboard"
  | "/admin/users"
  | "/admin/books"
  | "/admin/genres"
  | "/admin/authors"
  | "/admin/borrows"
  | "/admin/membership";

export type SidebarItem = {
  title: SidebarTitle;
  path: SidebarPath;
  icon: React.ReactNode;
};
