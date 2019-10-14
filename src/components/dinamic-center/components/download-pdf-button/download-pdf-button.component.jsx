import React from 'react';
import './download-pdf-button.styles.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import pdfFile from '../../../../assets/JorgeRivera-Resume.pdf';

const DownloadPdfButton = () => (
  <div className="download-pdf-button" title="Download PDF">
    <a href={pdfFile} download>
      <Icon icon="download" className="icon" />
    </a>
  </div>
);

export default DownloadPdfButton;
