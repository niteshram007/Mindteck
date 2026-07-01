"use client";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

export default function Committees() {
  const [allGroupedCommittees, setAllGroupedCommittees] = useState({});

  const getAllCommittees = async () => {
    try {
      const { data } = await axiosInstance("public/committee/getallGrouped");
      setAllGroupedCommittees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCommittees();
  }, []);
  const auditCommittee = allGroupedCommittees["Audit Committee"] || [];
  const stakeholders =
    allGroupedCommittees["Stakeholders Relationship Committee"] || [];
  const nominationAndRemuneration =
    allGroupedCommittees["Nomination and Remuneration Committee"] || [];
  const csr =
    allGroupedCommittees["Corporate Social Responsibility Committee"] || [];

  return (
    <div className="font-inter">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 items-stretch">
        <div>
          <Card className="h-full shadow-none rounded-none border-[#858484] border border-t-0">
            <CardHeader className="bg-primary py-2 px-3 text-white text-md font-semibold">
              Audit Committee
            </CardHeader>
            <CardContent className="px-3 mt-2">
              <CommitteeMemberTable data={auditCommittee} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full shadow-none rounded-none border-[#858484] border border-t-0">
            <CardHeader className="bg-primary py-2 px-3 text-white text-md font-semibold">
              Stakeholders Relationship Committee
            </CardHeader>
            <CardContent className="px-3 mt-2">
              <CommitteeMemberTable data={stakeholders} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full shadow-none rounded-none border-[#858484] border border-t-0">
            <CardHeader className="bg-primary py-2 px-3 text-white text-md font-semibold">
              Nomination and Remuneration Committee
            </CardHeader>
            <CardContent className="px-3 mt-2">
              <CommitteeMemberTable data={nominationAndRemuneration} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full shadow-none rounded-none border-[#858484] border border-t-0">
            <CardHeader className="bg-primary py-2 px-3 text-white text-md font-semibold">
              Corporate Social Responsibility Committee
            </CardHeader>
            <CardContent className="px-3 mt-2">
              <CommitteeMemberTable data={csr} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const CommitteeMemberTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">Name of the Director </TableHead>
          <TableHead className="text-black">Designation</TableHead>
          <TableHead className="text-black">Position </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el) => (
          <TableRow key={el._id}>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.designation}</TableCell>
            <TableCell>{el.position}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
