import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ResumeEditor from './components/ResumeEditor';
import ResumeForm from './pages/ResumeForm';
import Result from './components/Result';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-editor" element={<ResumeEditor />} />
          <Route path="/resume-form" element={<ResumeForm />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 