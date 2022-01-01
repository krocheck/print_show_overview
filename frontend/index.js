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

function PrintRecordsApp() {
	return (
		<div>
			<Toolbar/>
			<Box margin={3}>
				<Report/>
			</Box>
		</div>
	);
}

function Toolbar() {
	return (
		<Box className="print-hide" padding={2} borderBottom="thick" display="flex">
			<Button
				onClick={() => {
					printWithoutElementsWithClass('print-hide');
				}}
				marginLeft={2}
			>
				Print
			</Button>
		</Box>
	);
}

function Report() {
	const base = useBase();
	const table = base.getTableByName('Documentation');
	const view = table.getViewByNameIfExists('Show Overview');
	const field = table.getFieldByName("Notes");
	const records = useRecords(view);

	return (
		<div>
			<Box marginY={3}>
				<img src="https://trimarq.com/wp-content/uploads/2017/04/New_TriMarq_big.png" width="33%"/>
				{records.map(record => {
					const isRowIncluded = record.getCellValue('Include');
					return (
						(isRowIncluded ? (
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
