# Blueberry - Law School Application Tracker

## Overview

Blueberry is a comprehensive law school application tracking platform designed to help prospective law students manage their application process. The application allows users to track their applications across multiple law schools, analyze school data, and manage their law school journey from a centralized platform.

The project is built as a full-stack web application with a React frontend and Express backend, designed for deployment on cloud platforms like Railway. The application includes user management, law school data management, and application tracking capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **August 2025**: Successfully completed full production deployment to Render with custom domain and streamlined Git workflow:
  - **Render Deployment Success**: Migrated from Railway to Render platform with complete working deployment
  - **Custom Domain Setup**: Configured myblueberry.io with proper DNS ALIAS records and SSL certificates
  - **DNS Resolution**: Fixed DNS conflicts by removing conflicting A records and using ALIAS configuration
  - **Asset Serving Fix**: Resolved JavaScript/CSS asset serving issues by removing conflicting static file routes
  - **GitHub Integration**: Resolved Git lock issues and established complete application sync with GitHub repository
  - **Streamlined Git Workflow**: Established reliable deployment process using Shell commands: `git add . && git commit -m "message" && git push origin main`
  - **Production Ready**: Both myblueberry.io and blueberry-nlvl.onrender.com now serving the full Blueberry application
  - **Complete Application Deployed**: Full React frontend, Express backend, and all law school tracking features now live
  - All deployment infrastructure properly configured for continuous automated deployment from Replit to production

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for utility-first styling approach
- **File Structure**: Component-based architecture with separation of concerns

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for both frontend and backend consistency
- **Static File Serving**: Express serves built React application in production
- **API Design**: RESTful API structure with health check endpoints

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle ORM)
- **ORM**: Drizzle ORM with schema-first approach
- **Schema Validation**: Zod for runtime type validation and schema creation
- **Core Entities**:
  - Users (authentication, profile data including LSAT scores and GPA)
  - Law Schools (institution data, rankings, tuition information)
  - User Schools (application tracking, status management, scholarship data)

### Authentication and Authorization
- Basic user authentication system with email/password
- User verification system with email confirmation
- Session-based authentication (implementation details to be added)

### Deployment Architecture
- **Platform**: Railway deployment with Nixpacks builder
- **Process Management**: Single replica with failure restart policy
- **Static Assets**: Bundled and served through Express in production
- **Development**: Vite Express integration for hot reloading

### Code Organization
- **Monorepo Structure**: Shared code between client and server
- **Path Aliases**: TypeScript path mapping for clean imports
- **Type Safety**: End-to-end TypeScript with shared type definitions

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM for frontend framework
- **Express.js**: Web server framework for Node.js
- **Vite**: Build tool and development server
- **TypeScript**: Language and type system

### Database and ORM
- **Drizzle ORM**: PostgreSQL object-relational mapping
- **PostgreSQL**: Primary database system (to be configured)
- **Zod**: Schema validation and type inference

### Development and Build Tools
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer
- **Vite Express**: Development integration between Vite and Express

### Deployment Services
- **Railway**: Cloud deployment platform
- **Nixpacks**: Automatic build system for Railway

### Potential Future Integrations
- Email service for user verification
- Authentication providers (OAuth)
- Payment processing for premium features
- External law school data APIs