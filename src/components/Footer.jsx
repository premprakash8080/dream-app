import React from 'react'

function Footer() {
  return (
    <div>{/* Footer */}
    <footer className="py-6 px-6 bg-white border-t text-sm text-gray-600">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          🌙 DreamScape
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
      <p className="text-center mt-4">&copy; 2025 DreamScape. All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Footer