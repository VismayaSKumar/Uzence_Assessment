import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField"; 
import { DataTable} from "./components/DataTable/DataTable";
import type{ Column } from "./components/DataTable/DataTable";

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

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [view,setView]= useState("");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-7 gap-8">
      <h1 className="text-3xl font-bold mb-2">Choose your component</h1>
      <div className="flex gap-10 ">
        <button className="p-4 text-bold hover:bg-gray-950 duration-300 bg-gray-500 text-white rounded-2xl px-10" onClick={()=>setView("input")}>InputField</button>
        <button className="p-4 text-bold hover:bg-gray-950 duration-300 bg-gray-500 text-white rounded-2xl px-10" onClick={()=>setView("table")}>DataTable</button>
      </div>

      {view === "input"&&(
        <div className="w-full max-w-md bg-white p-6 flex flex-col items-center justify-between gap-4 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">InputField Demo</h1>
          <InputField
            label="Full Name"
            placeholder="Enter your name"
            helperText="This will be visible to others."
            value={name}
            onChange={e => setName(e.target.value)}
            size="md"
            variant="outlined"
            clearable
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            invalid={email !== "" && !email.includes("@")}
            errorMessage="Please enter a valid email address."
            size="md"
            variant="filled"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            showPasswordToggle
            size="md"
            variant="outlined"
          />
          <InputField
            label="Loading Example"
            placeholder="Click on the below button"
            value=""
            onChange={() => {}}
            loading={true}
            size="sm"
            variant="ghost"
            disabled
          />

          <button
            className="px-4 py-2 bg-amber-500 hover:bg-amber-900 duration-400 hover:border-black text-white rounded"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
          >
            {loading ? "Loading..." : "Show Loading State"}
          </button>

          <InputField
            label="Change Name here"
            value={name}
            onChange={e => setName(e.target.value)}
            loading={loading}
          />
            </div>
          )}
      {view === "table" && (
        <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-medium mb-4">DataTable Demo</h2>
          <DataTable<User>
            columns={columns}
            data={data}
            selectable
            onRowSelect={(rows) => console.log("Selected rows:", rows)}
          />
          <DataTable
            loading 
            data={data} 
            columns={columns}/>
        </div>
      )}
    </div>
  );
};

export default App;
