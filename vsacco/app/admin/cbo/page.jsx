"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconButton, Tooltip } from "@mui/material";
import { Plus } from "lucide-react";
import { createMRTColumnHelper } from "material-react-table";
import useSWR from "swr";
import MaterialTable from "@/app/ui/table/page";
import { ThreeDots } from "react-loader-spinner";

const columnHelper = createMRTColumnHelper();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const columns = [
  columnHelper.accessor("name", {
    header: "CHAMA",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
    size: 150,
  }),
  columnHelper.accessor("description", {
    header: "DESCRIPTION",
    muiTableHeadCellProps: { style: { color: "rgb(37 99 235)" } },
    size: 300,
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
  if (isLoading) {
    return <div className="text-primary flex align-middle justify-center items-center h-screen">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#2563eb"
        radius="9"
        ariaLabel="saving-chama-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button>
          <Link
            href={`/admin/cbo/add`}
            className="flex"
          >
            <Plus className="mr-2 h-6 w-5" /> Register New Chama
          </Link>
        </Button>
      </div>
      <div className="flex justify-center">
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
