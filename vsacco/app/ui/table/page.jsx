'use client';

import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import { jsPDF } from 'jspdf'; 
import autoTable from 'jspdf-autotable';
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
} from '@/components/ui/dropdown-menu';
import { ArrowRightLeft, CloudDownload, PenLine } from 'lucide-react';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const MaterialTable = ({ data = [], columns = [], tableName }) => {
  if (!Array.isArray(data) || !Array.isArray(columns)) {
    console.error("Data or columns are not properly initialized");
    return null; 
  }

  const handleExportRowsPDF = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('User-Transactions.pdf');
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
    enableRowActions: true,
    enableRowNumbers: true,
    positionActionsColumn: 'last',
    defaultColumn: {
      minSize: 20,
      maxSize: 1000,
      size: 150,
    },
    displayColumnDefOptions: {
      'mrt-row-select': {
        size: 20,
        grow: false,
      },
      'mrt-row-numbers': {
        size: 20,
        grow: true,
      },
    },
    getRowId: (row) => row.id,
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "4px",
          flexWrap: "wrap",
        }}
      >
        <div className="flex gap-3">
          <h3 className="font-semibold">{tableName}</h3>
        </div>

        {/* Export Data */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Tooltip title="Export Data">
              <CloudDownload />
            </Tooltip>
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
                          onClick={() =>
                            handleExportRowsPDF(table.getRowModel().rows)
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
                          onClick={() =>
                            handleExportRowsPDF(
                              table.getSelectedRowModel().rows
                            )
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="View">
          <Button className="flex items-center" color="error">
            <Link
              href={`/admin/cbo/${encodeURIComponent(row.original.id)}`}
              className="flex gap-1 hover:underline"
            >
              <PenLine className="h-4 w-4" /> Manage
            </Link>
          </Button>
        </Tooltip>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default MaterialTable;
