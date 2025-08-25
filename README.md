# Audio Transcription App

A modern React application that enables users to record audio and get AI-powered transcriptions using OpenAI's Whisper API. The app features secure data storage with client-side encryption and a clean, responsive UI.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm i
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ENCRYPTION_KEY=your_envcrypted_key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

### Additional Commands
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Technical Architecture & Design Decisions

### **Component Library & UI Framework**
- **shadcn/ui**: Headless UI components built on Radix primitives. Provides full control over styling while maintaining accessibility compliance. Chose over Material-UI or Chakra for better customization and smaller bundle size.
- **Tailwind CSS v4**: Utility-first CSS framework with improved performance via native CSS features. Enables rapid prototyping while maintaining design consistency through design tokens.


### **State Management & API Layer**
- **Redux Toolkit Query (RTK Query)**: Provides normalized caching, automatic refetching, optimistic updates, and request deduplication. Chosen over React Query for better Redux DevTools integration and normalized cache structure.
- **React Media Recorder**: Leverages native MediaRecorder API with fallbacks for cross-browser compatibility. Handles audio encoding and blob generation efficiently.

### **Security & Data Handling**
- **Client-side encryption (AES-256)**: All transcriptions encrypted using crypto-js before database storage. Encryption key managed via environment variables. Ensures data privacy even with database breaches.
- **Supabase Row Level Security (RLS)**: Database-level access controls combined with client-side encryption for defense in depth.
- **Environment variable isolation**: Vite's VITE_ prefix ensures proper build-time variable injection while preventing server-side leaks.

### **Build Tooling & Performance**
- **Vite + SWC**: Rust-based compilation for faster builds (~10x faster than Babel). Native ES modules in development with optimized bundling for production.
- **TypeScript strict mode**: Full type safety with strict null checks, no implicit any, and exact optional property types. Reduces runtime errors and improves maintainability.
- **Path aliases**: Configured absolute imports (@/) to improve code organization and reduce relative path complexity.

### **Architectural Trade-offs**
- **Client-side encryption vs. server-side**: Simplified key management but limits advanced features like searchable encryption or key rotation without client updates.
- **RTK Query vs. React Query**: Better Redux integration and normalized cache, but steeper learning curve and more boilerplate for simple queries.
- **Supabase vs. custom backend**: Faster development and built-in auth/RLS, but vendor lock-in and limited control over database optimizations and custom business logic.
