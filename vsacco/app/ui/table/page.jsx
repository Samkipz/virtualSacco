import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightLeft, CloudDownload } from "lucide-react";

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("invoice_id", {
    header: "INVOICE",
  }),
  columnHelper.accessor("provider", {
    header: "PROVIDER",
  }),
  columnHelper.accessor("account", {
    header: "ACCOUNT",
  }),
  columnHelper.accessor("currency", {
    header: "CURRENCY",
  }),
  columnHelper.accessor("net_amount", {
    header: "AMOUNT",
  }),
  columnHelper.accessor("charges", {
    header: "CHARGES",
  }),
  columnHelper.accessor("state", {
    header: "STATUS",
  }),
  columnHelper.accessor("mpesa_ref", {
    header: "MPESA_REF",
  }),
  columnHelper.accessor("api_ref", {
    header: "REASON",
  }),
  columnHelper.accessor("created_at", {
    header: "DATE",
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const MaterialTable = ({ data }) => {
  // Export PDF
  const handleExportRowsPDF = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("User-Transactions.pdf");
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <div className="flex gap-3">
          <ArrowRightLeft className="h-6 w-6 mr-2" />
          <h3 className="font-semibold">Recent Transations</h3>
        </div>
        
       
        {/* Export Data */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CloudDownload/>
            
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {/* Export PDF */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Export To PDF</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          disabled={
                            table.getPrePaginationRowModel().rows.length === 0
                          }
                          //export all rows, including from the next page, (still respects filtering and sorting)
                          onClick={() =>
                            handleExportRowsPDF(
                              table.getPrePaginationRowModel().rows
                            )
                          }
                          startIcon={<FileDownloadIcon />}
                        >
                          Export All Rows
                        </Button>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          disabled={table.getRowModel().rows.length === 0}
                          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                          onClick={() => handleExportRowsPDF(table.getRowModel().rows)}
                          startIcon={<FileDownloadIcon />}
                        >
                          Export Page Rows
                        </Button>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                          }
                          //only export selected rows
                          onClick={() => handleExportRowsPDF(table.getSelectedRowModel().rows)}
                          startIcon={<FileDownloadIcon />}
                        >
                          Export Selected Rows
                        </Button>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              {/* Export CSV */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Export To CVS</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                          onClick={handleExportData}
                          startIcon={<FileDownloadIcon />}
                        >
                          Export All Data
                        </Button>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          disabled={
                            table.getPrePaginationRowModel().rows.length === 0
                          }
                          //export all rows, including from the next page, (still respects filtering and sorting)
                          onClick={() =>
                            handleExportRows(
                              table.getPrePaginationRowModel().rows
                            )
                          }
                          startIcon={<FileDownloadIcon />}
                        >
                          Export All Rows
                        </Button>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          disabled={table.getRowModel().rows.length === 0}
                          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                          onClick={() =>
                            handleExportRows(table.getRowModel().rows)
                          }
                          startIcon={<FileDownloadIcon />}
                        >
                          Export Page Rows
                        </Button>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>
                        <Button
                          disabled={
                            !table.getIsSomeRowsSelected() &&
                            !table.getIsAllRowsSelected()
                          }
                          //only export selected rows
                          onClick={() =>
                            handleExportRows(table.getSelectedRowModel().rows)
                          }
                          startIcon={<FileDownloadIcon />}
                        >
                          Export Selected Rows
                        </Button>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default MaterialTable;
