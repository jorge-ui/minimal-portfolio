import React, { useEffect, useState } from 'react';
import './resume-page.styles.scss';
import { Document, Page, pdfjs } from 'react-pdf';
// @ts-ignore
import 'react-pdf/dist/Page/AnnotationLayer.css';
import appApi from "../../appApi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumePage = () => {
	const isMobile = window.isMobile();
	const [pdf, setPdf] = useState<null | string>(null);

	useEffect(() => {
		setPdf(appApi.defaults.baseURL + '/resume.pdf')
	}, []);

	return (
		<Document file={pdf} className="resume-doc" error="PDF file">
			<Page pageNumber={1} scale={isMobile ? 0.65 : 0.95}/>
		</Document>
	);
};

export default ResumePage;
