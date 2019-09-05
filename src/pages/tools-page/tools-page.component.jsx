import React from 'react';
import WheelSpinner from '../../components/wheel-spinner/wheel-spinner.component';
import graphqlIcon from '../../assets/tools-icons/graphql.png';
import nodeSassIcon from '../../assets/tools-icons/node-sass.png';
import mongoDbIcon from '../../assets/tools-icons/mongodb.png';
import reduxIcon from '../../assets/tools-icons/redux.png';
import reactSpringIcon from '../../assets/tools-icons/react-spring.png';
import vsCodeIcon from '../../assets/tools-icons/vs-code.png';
import jqueryIcon from '../../assets/tools-icons/jquery.png';
import firebaseIcon from '../../assets/tools-icons/firebase.png';
import javascriptIcon from '../../assets/tools-icons/javascript.png';
import nodeJsIcon from '../../assets/tools-icons/node-js.png';
import expressJsIcon from '../../assets/tools-icons/express-js.png';
import reactIcon from '../../assets/tools-icons/react.png';
import gitIcon from '../../assets/tools-icons/git.png';
import herokuIcon from '../../assets/tools-icons/heroku.png';

// prettier-ignore
const ToolsPage = () => (
  <WheelSpinner isTools>
    {[
      { id: 1, name: 'GrapthQL',     logo: graphqlIcon,       color: '#171E26' },
      { id: 2, name: 'Sass',         logo: nodeSassIcon,      color: '#CF649A' },
      { id: 3, name: 'Mongo DB',     logo: mongoDbIcon,       color: '#FAFBFC' },
      { id: 4, name: 'Redux',        logo: reduxIcon,         color: '#764ABC' },
      { id: 5, name: 'React Spring', logo: reactSpringIcon,   color: '#FFFFFF' },
      { id: 6, name: 'VS Code',      logo: vsCodeIcon,        color: '#2C2C32' },
      { id: 7, name: 'jQuery',       logo: jqueryIcon,        color: '#0769AD' },
      { id: 8, name: 'Firebase',     logo: firebaseIcon,      colot: '#FFFFFF' },
      { id: 9, name: 'JavaScript',   logo: javascriptIcon,    color: '#F0DB4F' },
      { id: 10, name: 'Node.js',      logo: nodeJsIcon,        color: 'linear-gradient(135deg, #378d3b, #53b757)' },
      { id: 11, name: 'Express.js',   logo: expressJsIcon,     color: '#FDFDFD' },
      { id: 12, name: 'React.js',     logo: reactIcon,         color: '#282C34' },
      { id: 13, name: 'Git',          logo: gitIcon,           color: '#F0EFE7' },
      { id: 14, name: 'Heroku',       logo: herokuIcon,        color: 'linear-gradient(135deg, #AC8ECE, #79589f)' }
    ]}
  </WheelSpinner>
);

export default ToolsPage;
