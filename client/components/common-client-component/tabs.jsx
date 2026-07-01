"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const CustomTabs = Tabs

const CustomTabsList = (({ className, ...props }, ref) => (
  <TabsList
    ref={ref}
    className={cn("inline-flex h-10 items-center justify-start rounded-none bg-transparent p-0", className)}
    {...props}
  />
))
CustomTabsList.displayName = "CustomTabsList"

const CustomTabsTrigger = (({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none relative group",
      "border-b-2 border-transparent",
      "hover:text-foreground",
      className,
    )}
    {...props}
  >
    {props.children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-muted-foreground/40 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 data-[state=active]:scale-x-100" />
  </TabsTrigger>
))
CustomTabsTrigger.displayName = "CustomTabsTrigger"

const CustomTabsContent = TabsContent

export { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent }

