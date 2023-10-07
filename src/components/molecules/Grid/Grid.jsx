import { AgGridReact } from "ag-grid-react";
import { forwardRef, useMemo, useRef, useState } from "react";


const Grid = forwardRef((props, ref) => {
	const { data, header, onCellClickedEvent } = props;

	const defaultColDef = useMemo(() => {
    return {
        resizable: true,
        sortable : true,
        filter   : true,
    };
  }, []);

  const onCellClickedHandler = (e) => {
    onCellClickedEvent && onCellClickedEvent(e.data.entp_unq);
  }

	return (
		<div className={"ag-theme-alpine"} style={{width:'100%', height: '500px'}}>
			<AgGridReact
				rowData       = {data}
				columnDefs    = {header}
        defaultColDef = {defaultColDef}
        rowSelection  = "multiple"
        animateRows   = {true}
				onGridReady   = {(e)=> {
          e.api.sizeColumnsToFit()
        }}
        onCellClicked = {onCellClickedHandler}
			/>
		</div>
	)
});

export default Grid;