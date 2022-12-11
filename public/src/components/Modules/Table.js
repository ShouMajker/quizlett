import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ columns, tableData }) => {
    return (
        <>
            <table>
                <TableHead columns={columns}/>
                <TableBody columns={columns} tableData={tableData}/>
            </table>
        </>
    )
}
export default Table