# Brand Rating System Setup Script
# Run this script after installing Node.js, npm, and PostgreSQL

Write-Host "🚀 Setting up Brand Rating System..." -ForegroundColor Green

# Check if Node.js is installed
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "✅ Node.js is installed: $(node --version)" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "✅ npm is installed: $(npm --version)" -ForegroundColor Green
} else {
    Write-Host "❌ npm is not installed. Please install npm" -ForegroundColor Red
    exit 1
}

# Check if Git is installed
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "✅ Git is installed: $(git --version)" -ForegroundColor Green
    
    # Initialize git repository
    if (!(Test-Path ".git")) {
        Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
        git init
        git add .
        git commit -m "Initial commit: Brand Rating System with Express.js backend and React.js frontend"
        Write-Host "✅ Git repository initialized" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️ Git is not installed. Skipping repository initialization." -ForegroundColor Yellow
}

Write-Host "🔧 Setting up backend..." -ForegroundColor Yellow
Set-Location "backend"

# Install backend dependencies
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Copy environment file
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Environment file created. Please update .env with your database credentials." -ForegroundColor Green
}

Set-Location ".."

Write-Host "🔧 Setting up frontend..." -ForegroundColor Yellow
Set-Location "frontend"

# Install frontend dependencies
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install and configure PostgreSQL" -ForegroundColor White
Write-Host "2. Create database: CREATE DATABASE brand_rating_system;" -ForegroundColor White
Write-Host "3. Update backend/.env with your database credentials" -ForegroundColor White
Write-Host "4. Start backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "5. Start frontend: cd frontend && npm start" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Frontend will run on: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend API will run on: http://localhost:3001" -ForegroundColor Cyan
