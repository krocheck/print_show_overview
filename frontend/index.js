import {
	initializeBlock,
	Button,
	useBase,
	useRecords,
	Box,
	CellRenderer,
	Text,
} from '@airtable/blocks/ui';
import React from 'react';
import printWithoutElementsWithClass from './print_without_elements_with_class';

const TableName = 'Documentation'
const ViewName = 'Show Overview'

function PrintRecordsApp() {
	const base = useBase();

	// We want to render the list of records in this table.
	const table = base.getTableByName(TableName);

	// The view may have been deleted, so we use getViewByIdIfExists
	// instead of getViewById. getViewByIdIfExists will return null
	// if the view doesn't exist.
	const view = table.getViewByNameIfExists(ViewName);

	return (
		<div>
			<Toolbar table={table} />
			<Box margin={3}>
				<Report view={view} />
			</Box>
		</div>
	);
}

// The toolbar contains the view picker and print button.
function Toolbar({table}) {
	return (
		<Box className="print-hide" padding={2} borderBottom="thick" display="flex">
			<Button
				onClick={() => {
					// Inject CSS to hide elements with the "print-hide" class name
					// when the app gets printed. This lets us hide the toolbar from
					// the print output.
					printWithoutElementsWithClass('print-hide');
				}}
				marginLeft={2}
			>
				Print
			</Button>
		</Box>
	);
}

// Renders a <Record> for each of the records in the specified view.
function Report({view}) {
	const records = useRecords(view);

	const base = useBase();
	const table = base.getTableByName(TableName);
	const field = table.getFieldByName("Notes");

	if (!view) {
		return <div>Required view (Show Overview) not found!</div>;
	}

	return (
		<div>
			<Box marginY={3}>
				<img src="https://trimarq.com/wp-content/uploads/2017/04/New_TriMarq_big.png" width="33%"/>
				{records.map(record => {
					// Render a check or an x depending on if the artist is on display or not.
					const isArtistOnDisplay = record.getCellValue('Include');
					return (
						(isArtistOnDisplay ? (
							<p>
								<Text><span style={{fontWeight: 'bold'}}>{record.getCellValue('Name')}</span></Text>
							<br />
								<CellRenderer field={field} record={record} />
							</p>) : "")
					);
				})}
			</Box>
		</div>
	);
}

initializeBlock(() => <PrintRecordsApp />);
