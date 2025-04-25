
import { useState } from 'react'
import { ChatInterface } from './components/ChatInterface'
import './App.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">AI Saree Finder</h1>
          <div className="text-sm text-gray-500">Find your perfect saree</div>
        </div>
      </header>
      
      <main className="flex-1 max-w-6xl w-full mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="bg-white py-3 px-6 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto">
          AI Saree Finder © {new Date().getFullYear()} | Helping you discover beautiful sarees
        </div>
      </footer>
    </div>
  )
}

export default App