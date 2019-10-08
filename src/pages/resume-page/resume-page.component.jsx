import React, { useState, useEffect } from 'react';
import './resume-page.styles.scss';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../../assets/ResumeFile.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumePage = () => {
  const isMobile = window.innerWidth < 576;
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    setTimeout(() => setPdf(pdfFile), 600);
  }, []);
  return (
    <Document file={pdf} className="resume-doc" error="PDF file">
      <Page pageNumber={1} scale={isMobile ? 0.65 : 0.95} />
    </Document>
  );
};

export default ResumePage;
