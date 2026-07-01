import { Calendar, ChevronDown, Home, Inbox } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { AuthProvider } from "@/app/admin/layout";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoWhite from "@/app/assets/images/logo-white.png";
// Main Menu items
const items = [
  {
    title: "Page",
    url: "pages",
    icon: Home,
    type: ["SuperAdmin"],
  },
  {
    title: "User Management",
    url: "user-management",
    icon: Home,
    type: ["SuperAdmin"],
  },
  {
    title: "Slider",
    url: "slider",
    icon: Home,
    type: ["SuperAdmin"],
  },
  {
    title: "Menu",
    url: "menu",
    icon: Inbox,
    type: ["SuperAdmin"],
  },
  {
    title: "About Us",
    url: "",
    hasChildren: true,
    icon: Calendar,
    type: ["SuperAdmin"],
    children: [
      {
        title: "Leadership Member",
        url: "leadership-member",
        type: ["SuperAdmin"],
      },
      {
        title: "Board of Directors",
        url: "board-of-directors",
        type: ["SuperAdmin"],
      },
    ],
  },

  {
    title: "Global Office",
    url: "",
    hasChildren: true,
    icon: Calendar,
    type: ["SuperAdmin"],
    children: [
      {
        title: "Country",
        url: "country",
        type: ["SuperAdmin"],
      },
      {
        title: "Office",
        url: "office-location",
        type: ["SuperAdmin"],
      },
    ],
  },
  {
    title: "Partners and Alliances",
    url: "partners-and-alliances",
    icon: Inbox,
    type: ["SuperAdmin"],
  },
  {
    title: "Press Release",
    url: "press-release",
    icon: Inbox,
    type: ["SuperAdmin"],
  },
  {
    title: "Resources",
    url: "",
    hasChildren: true,
    icon: Inbox,
    type: ["SuperAdmin"],
    children: [
      {
        title: "Resource Categories",
        url: "resource-category",
        type: ["SuperAdmin"],
      },
      {
        title: "Case Studies",
        url: "case-study",
        type: ["SuperAdmin"],
      },
      {
        title: "Brochures",
        url: "brochure",
        type: ["SuperAdmin"],
      },
    ],
  },
  {
    title: "Investor",
    url: "",
    hasChildren: true,
    icon: Calendar,
    type: ["SuperAdmin"],
    children: [
      {
        title: "Policy",
        url: "investors/policy",
        type: ["SuperAdmin"],
      },
      {
        title: "Annual Report",
        url: "investors/annual-report",
        type: ["SuperAdmin"],
      },
      {
        title: "Financial Info",
        url: "investors/financial-information",
        type: ["SuperAdmin"],
      },
      {
        title: "Notices",
        url: "investors/notice",
        type: ["SuperAdmin"],
      },
      {
        title: "Committees",
        url: "investors/committees",
        type: ["SuperAdmin"],
      },
      {
        title: "stock Exchange Filing",
        url: "investors/stock-exchange-filing",
        type: ["SuperAdmin"],
      },
    ],
  },
  {
    title: "Investor service",
    hasChildren: true,
    icon: Inbox,
    children: [
      {
        title: "Investor Downloads",
        url: "investors/investor-downloads",
        type: ["SuperAdmin"],
      },
      {
        title: "Transfer of equity shares to IEPF",
        url: "investors/transfer-of-equity-shares-to-iepf",
        type: ["SuperAdmin"],
      },
      {
        title: "Unclaimed/Unpaid Dividend",
        url: "investors/unclaimed-unpaid-dividend",
        type: ["SuperAdmin"],
      },
    ],
    type: ["SuperAdmin"],
  },
  {
    title: "Other Information",
    icon: Inbox,
    url: "case-study",
    hasChildren: true,
    children: [
      {
        title: 'Saksham Niveshak',
        url: 'investors/saksham-niveshak',
        type: ['SuperAdmin'],
      },
      {
        title: "CSR Projects",
        url: "investors/csr-projects",
        type: ["SuperAdmin"],
      },
      {
        title: "Buy Back",
        url: "investors/buy-back",
        type: ["SuperAdmin"],
      },
      {
        title: "Annual Secretarial Compliance Report",
        url: "investors/annual-secretarial-compliance-report",
        type: ["SuperAdmin"],
      },
      {
        title: "Disclosures of Related Party Transactions",
        url: "investors/disclosures-of-related-party-transactions",
        type: ["SuperAdmin"],
      },
      {
        title: "Annual Return",
        url: "investors/annual-return",
        type: ["SuperAdmin"],
      },
      {
        title: "AGM Transcript",
        url: "investors/agm-transcript",
        type: ["SuperAdmin"],
      },
      {
        title: "Voting Results",
        url: "investors/voting-results",
        type: ["SuperAdmin"],
      },
      {
        title: "Share Holding Pattern",
        url: "investors/share-holding-pattern",
        type: ["SuperAdmin"],
      },
      {
        title: "Subsidiaries Financial",
        url: "investors/subsidiaries-financial",
        type: ["SuperAdmin"],
      },
      {
        title: "Postal Ballot",
        url: "investors/postal-ballot",
        type: ["SuperAdmin"],
      },
      {
        title: "Trading Window",
        url: "investors/trading-window",
        type: ["SuperAdmin"],
      },
    ],
    type: ["SuperAdmin"],
  },
  {
    title: "Investor PDF uploads",
    url: "investors/investor-pdf-uploads",
    icon: Calendar,
    type: ["SuperAdmin"],
  },
  {
    title: "Feedback",
    url: "investors/investor-feedback",
    icon: Calendar,
    type: ["SuperAdmin"],
  },
  {
    title: "Cache Management",
    url: "cache",
    icon: Inbox,
    type: ["SuperAdmin"],
  },
];

const getPathByRoles = (menus, role) => {
  let urls = [];
  const filterUrlsByRole = menus.filter((el) => el.type.includes(role));
  filterUrlsByRole.forEach((el) => {
    if (el.hasChildren) {
      el.children.forEach((item) => {
        if (item.type.includes(role)) {
          urls.push(item.url);
        }
      });
    } else {
      urls.push(el.url);
    }
  });
  return urls.filter((el) => el !== "");
};

export const roleWiseAccessiblePath = {
  SuperAdmin: [
    ...getPathByRoles(items, "SuperAdmin"),
    "candidate-applications",
  ],
  Admin: [...getPathByRoles(items, "Admin"), "candidate-applications"],
  Recruiter: getPathByRoles(items, "Recruiter"),
};

export function AppSidebar() {
  const { user } = useContext(AuthProvider);
  const pathname = usePathname();
  return (
    <Sidebar variant="sidebar" className="bg-primary">
      <SidebarContent className="bg-primary">
        <SidebarGroup>
          <Image
            width={200}
            height={30}
            src={LogoWhite.src}
            alt="logo"
            className="m-auto mb-2"
          />
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Main menu items */}
              {items
                .filter((el) => el.type.includes(user?.role))
                .map((item, index) => {
                  if (item.hasChildren) {
                    return (
                      <SidebarMenuItem key={item.url + index}>
                        <Collapsible>
                          <SidebarGroup className="p-0">
                            <SidebarGroupLabel asChild>
                              <SidebarMenuButton
                                asChild
                                className="text-sm font-normal text-[#7f9590]"
                                isActive={item.children.some(
                                  (el) => pathname === `/admin/${el.url}`
                                )}
                              >
                                <CollapsibleTrigger
                                  className={`flex justify-between items-center p-0 group`}
                                >
                                  {item.icon && <item.icon className="mr-2" />}
                                  <span className="font-inter">
                                    {item.title}
                                  </span>
                                  <ChevronDown
                                    className={`ml-auto transition-transform group-data-[state=open]:rotate-180`}
                                  />
                                </CollapsibleTrigger>
                              </SidebarMenuButton>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                              <SidebarGroupContent className="w-full">
                                <SidebarMenu className="min-w-0 translate-x-px flex-col gap-1  px-6 py-0.5 group-data-[collapsible=icon]:hidden before:left-3 before:h-full before:border before:border-[#7f9590] before:bg-white before:absolute">
                                  {item?.children?.map((child, subIndex) => (
                                    <SidebarMenuItem
                                      key={child.url + child.title + subIndex}
                                      className="after:absolute after:h-[2px] after:w-[14px] after:top-[44%] after:left-[-11px] after:bg-[#7f9590]"
                                    >
                                      <SidebarMenuButton
                                        asChild
                                        isActive={
                                          pathname === `/admin/${child.url}`
                                        }
                                        className="text-[#7f9590] data-[active=true]:bg-transparent data-[active=true]:text-tertiary"
                                      >
                                        <Link
                                          href={`/admin/${child.url}`}
                                          className={`
                                          ${
                                            child.type.includes(user?.role)
                                              ? "block"
                                              : "hidden"
                                          }
                                            `}
                                        >
                                          <span className="font-inter">
                                            {child.title}
                                          </span>
                                        </Link>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  ))}
                                </SidebarMenu>
                              </SidebarGroupContent>
                            </CollapsibleContent>
                          </SidebarGroup>
                        </Collapsible>
                      </SidebarMenuItem>
                    );
                  }
                  return (
                    <SidebarMenuItem
                      key={item.url + item.title}
                      className={
                        item.type.includes(user?.role) ? "block" : "hidden"
                      }
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/admin/${item.url}`}
                        className="text-[#7f9590]"
                      >
                        <Link
                          href={`/admin/${item.url}`}
                          className="flex items-center"
                        >
                          {item.icon && <item.icon className="mr-2" />}
                          <span className="font-inter">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              {/* Collapsible Help Section */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
