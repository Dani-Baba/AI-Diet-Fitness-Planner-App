Deployment Guide

This guide covers deployment steps for the AI Diet & Fitness Planner, configured for a Standard React (Create React App) project.
🚀 Quick Deployment Options
Option 1: Vercel (Recommended)

    Import: Connect your GitHub repository to Vercel.

    Configure:

        Framework Preset: Create React App.

        Build Command: npm run build.

        Output Directory: build.

    Environment Variables: Add these in the Vercel Dashboard under "Environment Variables":

        REACT_APP_GROQ_API_KEY

        REACT_APP_EMAILJS_SERVICE_ID

        REACT_APP_EMAILJS_TEMPLATE_ID

        REACT_APP_EMAILJS_PUBLIC_KEY

Option 2: Netlify

    Build: Run npm run build locally.

    Deploy: Drag the generated build/ folder into the Netlify dashboard.

    Environment Variables: Go to "Site settings" > "Environment" and add the REACT_APP_ variables listed above.

🔧 Environment Setup
Required Environment Variables

Create a .env file in your root directory:
# AI & Service Configuration
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

Important: Never commit your .env file to GitHub. Add it to your .gitignore file.

📊 Performance & Optimization
Build Configuration

The project is optimized for production:

    Code Splitting: Native React handling.

    Asset Minification: Automatically handled by npm run build.

    CSS Purging: Tailwind CSS is configured to purge unused styles in production.

🐛 Troubleshooting
Common Deployment Issues

    Build Fails: Ensure you are using Node.js (v18+) and try clearing node_modules before running npm install.

    Environment Variables Not Loading: Ensure all variables start strictly with REACT_APP_. Variables without this prefix will not be picked up by React.

    API Errors: Verify that your Groq API Key and EmailJS IDs are correctly copied into the deployment platform's dashboard.

📈 Monitoring & Maintenance
Security

    Keep your dependencies updated using npm audit to check for vulnerabilities.

    Regularly rotate your API keys if you suspect they have been exposed.

For further assistance, refer to the main README.md or contact the development team (Muhammad Danish, Rafay, and Hahir).