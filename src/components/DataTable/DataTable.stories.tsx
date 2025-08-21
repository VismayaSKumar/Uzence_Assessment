import type { Meta, StoryObj } from "@storybook/react";
import { DataTable}  from "./DataTable";
import type {DataTableProps, Column } from './DataTable'

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

const meta: Meta<DataTableProps<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  args: {
    columns,
    data,
    selectable: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<DataTableProps<User>>;

export const Default: Story = {};

export const Selectable: Story = {
  args: {
    selectable: true,
    onRowSelect: (rows) => console.log("Selected rows:", rows),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: [],
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
  },
};

export const SortableColumns: Story = {
  args: {
    columns: [
      { key: "name", title: "Name", dataIndex: "name", sortable: true },
      { key: "email", title: "Email", dataIndex: "email", sortable: true },
    ],
    selectable: true,
  },
};
