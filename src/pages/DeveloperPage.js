import React from 'react';
import '../styles/StaticPage.css';

const DeveloperPage = () => {
  return (
    <div className="static-page-container">
      <h1 className="static-page-title">For Developers</h1>
      <div className="static-page-content">
        <p>
          This application was proudly developed by a passionate software engineer as a portfolio project.
          It is open-source and available for you to explore, fork, and contribute to.
        </p>

        <h2>Lead Developer</h2>
        <p>
          <strong>John Doe</strong> - A full-stack developer with a passion for creating beautiful and functional web applications.
        </p>
        <ul>
          <li>
            <a href="https://github.com/example/my-instagram-clone" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </li>
        </ul>

        <h2>Contributing</h2>
        <p>
          Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, please
          feel free to open an issue or submit a pull request on the GitHub repository.
        </p>
      </div>
    </div>
  );
};

export default DeveloperPage;
