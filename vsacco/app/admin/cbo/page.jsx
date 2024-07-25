"use client";
import MyBtn from "@/app/ui/button/page";
import styles from "./cbo.module.css";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import Search from "@/app/ui/search/search";
import prisma from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Plus } from "lucide-react";
import { createMRTColumnHelper } from "material-react-table";
import useSWR from "swr";
import MaterialTable from "@/app/ui/table/page";

const columnHelper = createMRTColumnHelper();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const columns = [
  columnHelper.accessor("name", {
    header: "CHAMA",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
  }),
  columnHelper.accessor("description", {
    header: "DESCRIPTION",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
  }),
  columnHelper.accessor("location", {
    header: "LOCATION",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
  }),
  columnHelper.accessor("address", {
    header: "ADDRESS",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
  }),
  columnHelper.accessor("certificate", {
    header: "CERTIFICATE NUMBER",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
  }),
  columnHelper.accessor("date_created", {
    header: "CREATED ON",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
    Cell: ({ cell }) => <>{new Date(cell.getValue()).toLocaleString()}</>, //optional custom cell render
  }),
];

const cbo = () => {
  const { data, error, isLoading } = useSWR("/api/chama", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  // Function to format date
  function formatCreatedDate(isoDateString) {
    // Parse the ISO date string into a Date object
    const dte = new Date(isoDateString);

    // Format the date to a human-readable format
    return dte.toLocaleDateString();
  }

  let num = 1;

  return (
    <>
      <div className="flex w-full justify-end mb-4">
        <Button>
          <Link
            href={`/admin/cbo/add`}
            className="flex"
          >
            <Plus className="mr-2 h-6 w-5" /> Register New Chama
          </Link>
        </Button>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        <MaterialTable
          data={data}
          columns={columns}
          tableName={<span className="font-semibold">List of Chamas</span>}
        />
      </div>
    </>
  );
};

export default cbo;
