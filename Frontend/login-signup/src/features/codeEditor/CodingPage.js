
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Form, Spinner } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import { FaCode, FaCheck, FaTimes, FaRandom, FaLightbulb, FaChevronRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CodingPage.css';

function CodingPage() {
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchLanguages();
    fetchCategories();
    fetchDifficulties();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('http://localhost:9099/api/languages');
      const data = await response.json();
      setLanguages(data);
      if (data.length > 0) {
        setLanguage(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:9099/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await fetch('http://localhost:9099/api/difficulties');
      const data = await response.json();
      setDifficulties(data);
    } catch (error) {
      console.error('Error fetching difficulties:', error);
    }
  };

  const fetchQuestion = async (type) => {
    setLoading(true);
    setShowResult(false);
    setResult(null);
    
    try {
      const endpoint = type === 'generate' 
        ? 'http://localhost:9099/api/questions/generate' 
        : 'http://localhost:9099/api/questions/random';
        
      const url = new URL(endpoint);
      if (selectedDifficulty) {
        url.searchParams.append('difficulty', selectedDifficulty);
      }
      if (selectedCategory) {
        url.searchParams.append('category', selectedCategory);
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setQuestion(data);
      
      // Set starter code based on language
      if (data.starterCode && data.starterCode[language]) {
        setCode(data.starterCode[language]);
      } else {
        setCode(getDefaultStarterCode(language));
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultStarterCode = (lang) => {
    switch(lang) {
      case 'java':
        return 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}';
      case 'python':
        return '# Your solution here\n\ndef solution():\n    pass\n';
      case 'javascript':
        return '// Your solution here\n\nfunction solution() {\n    // Implementation\n}\n';
      case 'c++':
        return '#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}\n';
      default:
        return '// Write your code here';
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    
    // Update starter code if available
    if (question && question.starterCode && question.starterCode[newLang]) {
      setCode(question.starterCode[newLang]);
    } else {
      setCode(getDefaultStarterCode(newLang));
    }
  };

  const handleSubmit = async () => {
    if (!question) return;
    
    setSubmitting(true);
    setShowResult(false);
    
    try {
      const response = await fetch('http://localhost:9099/api/submissions/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: question.id,
          code: code,
          language: language
        }),
      });
      
      const data = await response.json();
      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar bg={darkMode ? 'dark' : 'primary'} variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#"><FaCode className="me-2" /> CodeChamp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" active>Problems</Nav.Link>
              <Nav.Link href="#">Leaderboard</Nav.Link>
              <Nav.Link href="#">Learn</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Check 
                type="switch"
                id="dark-mode-switch"
                label="Dark Mode"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="me-2 text-white"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="mb-4">
            <Card className={`shadow-sm ${darkMode ? 'bg-dark text-white' : ''}`}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Problem Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Select 
                      value={selectedDifficulty} 
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className={darkMode ? 'bg-secondary text-white' : ''}
                    >
                      <option value="">Any Difficulty</option>
                      {difficulties.map((diff, index) => (
                        <option key={index} value={diff}>{diff}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={darkMode ? 'bg-secondary text-white' : ''}
                    >
                      <option value="">Any Category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      onClick={() => fetchQuestion('generate')}
                      disabled={loading}
                    >
                      {loading ? (
                        <><Spinner animation="border" size="sm" /> Generating...</>
                      ) : (
                        <>Generate AI Question <FaLightbulb className="ms-2" /></>
                      )}
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => fetchQuestion('random')}
                      disabled={loading}
                    >
                      {loading ? (
                        <><Spinner animation="border" size="sm" /> Loading...</>
                      ) : (
                        <>Random Question <FaRandom className="ms-2" /></>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {question && (
              <Card className={`mt-4 shadow-sm ${darkMode ? 'bg-dark text-white' : ''}`}>
                <Card.Header>
                  <h5 className="mb-0">Test Cases</h5>
                </Card.Header>
                <Card.Body>
                  <div className="test-cases">
                    {question.testCases && question.testCases.map((test, index) => (
                      <div key={index} className="test-case mb-3">
                        <div className="mb-2">
                          <strong>Input:</strong>
                          <pre className={`p-2 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                            {test.input}
                          </pre>
                        </div>
                        <div>
                          <strong>Expected Output:</strong>
                          <pre className={`p-2 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                            {test.output}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
          
          <Col md={9}>
            {question ? (
              <>
                <Card className={`shadow-sm mb-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">{question.title}</h4>
                    <span className={`badge ${
                      question.difficulty === 'Easy' ? 'bg-success' : 
                      question.difficulty === 'Medium' ? 'bg-warning' : 
                      'bg-danger'
                    }`}>
                      {question.difficulty}
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <div 
                      className="problem-description" 
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />
                    {question.hints && question.hints.length > 0 && (
                      <div className="mt-3">
                        <h5>Hints:</h5>
                        <ul>
                          {question.hints.map((hint, index) => (
                            <li key={index}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* {question.constraints && (
                      <div className="mt-3">
                        <h5>Constraints:</h5>
                        <ul>
                          {question.constraints.split('\n').map((constraint, index) => (
                            constraint.trim() && <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>
                    )} */}

{question.constraints && typeof question.constraints === 'string' && (
  <div className="mt-3">
    <h5>Constraints:</h5>
    <ul>
      {question.constraints.split('\n').map((constraint, index) => (
        constraint.trim() && <li key={index}>{constraint}</li>
      ))}
    </ul>
  </div>
)}
                  </Card.Body>
                </Card>
                
                <Card className={`shadow-sm mb-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">Solution</h5>
                    </div>
                    <div className="d-flex">
                      <Form.Select 
                        value={language} 
                        onChange={handleLanguageChange}
                        className={`me-2 ${darkMode ? 'bg-secondary text-white' : ''}`}
                        style={{ width: '150px' }}
                      >
                        {languages.map((lang) => (
                          <option key={lang.id} value={lang.id}>
                            {lang.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Button 
                        variant="success" 
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <><Spinner animation="border" size="sm" /> Running...</>
                        ) : (
                          <>Run <FaChevronRight /></>
                        )}
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div className="editor-container" style={{ height: '400px' }}>
                      <MonacoEditor
                        language={language}
                        theme={darkMode ? 'vs-dark' : 'vs-light'}
                        value={code}
                        options={{
                          selectOnLineNumbers: true,
                          scrollBeyondLastLine: false,
                          minimap: { enabled: true },
                          fontSize: 14,
                          automaticLayout: true
                        }}
                        onChange={(value) => setCode(value)}
                      />
                    </div>
                  </Card.Body>
                </Card>
                
                {showResult && result && (
                  <Card className={`shadow-sm mb-4 ${darkMode ? 'bg-dark text-white' : ''}`}>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Results</h5>
                      <span className={`badge ${result.success ? 'bg-success' : 'bg-danger'}`}>
                        {result.success ? 'All Tests Passed' : 'Tests Failed'}
                      </span>
                    </Card.Header>
                    <Card.Body>
                      {result.testCaseResults && result.testCaseResults.map((testResult, index) => (
                        <div key={index} className={`test-result mb-3 p-3 rounded ${testResult.passed ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                          <div className="d-flex justify-content-between">
                            <h6>Test Case {index + 1}</h6>
                            <span>
                              {testResult.passed ? (
                                <FaCheck className="text-success" />
                              ) : (
                                <FaTimes className="text-danger" />
                              )}
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <strong>Input:</strong>
                            <pre className={`p-2 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                              {testResult.input}
                            </pre>
                          </div>
                          
                          <div className="mt-2">
                            <div className="row">
                              <div className="col-md-6">
                                <strong>Expected Output:</strong>
                                <pre className={`p-2 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                                  {testResult.expectedOutput}
                                </pre>
                              </div>
                              <div className="col-md-6">
                                <strong>Your Output:</strong>
                                <pre className={`p-2 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                                  {testResult.actualOutput}
                                </pre>
                              </div>
                            </div>
                          </div>
                          
                          {testResult.executionTime && (
                            <div className="mt-2">
                              <small>
                                <strong>Execution Time:</strong> {testResult.executionTime} | 
                                <strong> Memory Used:</strong> {testResult.memoryUsed}
                              </small>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {!result.success && result.learningMaterials && (
                        <div className="learning-materials mt-4">
                          <h5 className="mb-3">Learning Materials</h5>
                          <div className="concept mb-3">
                            <h6>Key Concepts</h6>
                            <div className={`p-3 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                              {result.learningMaterials.conceptExplanation}
                            </div>
                          </div>
                          
                          <div className="tips mb-3">
                            <h6>Tips & Tricks</h6>
                            <ul className="list-group">
                              {result.learningMaterials.tipsTricks.map((tip, i) => (
                                <li key={i} className={`list-group-item ${darkMode ? 'bg-secondary text-white' : ''}`}>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="resources">
                            <h6>Further Reading</h6>
                            <div className={`p-3 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                              {result.learningMaterials.furtherReadingResources}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {result.success && result.optimizedCode && (
                        <div className="optimized-code mt-4">
                          <h5 className="mb-3">Optimized Solution</h5>
                          <div className={`p-3 rounded ${darkMode ? 'bg-secondary text-white' : 'bg-light'}`}>
                            <pre>{result.optimizedCode}</pre>
                          </div>
                          
                          {result.timeComplexity && result.spaceComplexity && (
                            <div className="complexity-info mt-3">
                              <p>
                                <strong>Time Complexity:</strong> {result.timeComplexity} | 
                                <strong> Space Complexity:</strong> {result.spaceComplexity}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <FaCode size={60} className={`mb-3 ${darkMode ? 'text-light' : 'text-primary'}`} />
                <h3 className={darkMode ? 'text-light' : ''}>Welcome to CodeChamp</h3>
                <p className={darkMode ? 'text-light' : 'text-muted'}>
                  Select your preferences and generate a question to start coding!
                </p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => fetchQuestion('generate')}
                  className="mt-3"
                >
                  Generate Your First Challenge
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      
      <footer className={`mt-5 py-4 text-center ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
        <Container>
          <p className="mb-0">&copy; 2025 CodeChamp - All rights reserved</p>
        </Container>
      </footer>
    </div>
  );
}

export default CodingPage;