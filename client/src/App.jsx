"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { ChevronDown, Send, Chrome, Mail, Users, Loader2 } from "lucide-react"
import "./index.css"

function App() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("professional")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [visitorCount, setVisitorCount] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [error, setError] = useState("")

  // Simulate visitor count with localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem("visitorCount") || 0
    const newCount = Number.parseInt(storedCount) + 1
    localStorage.setItem("visitorCount", newCount)
    setVisitorCount(newCount)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const response = await axios.post("https://ai-powered-email-reply-generator-1.onrender.com/api/email/generate", {
        emailContent: emailContent, // Correct key
        tone: tone, // Correct key
      });
  
      console.log("Backend Response:", response.data); // Debugging log
      setAiResponse(response.data); // Update state with the response
    } catch (err) {
      console.error("Error generating email:", err);
      setError("Failed to generate email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "friendly", label: "Friendly" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "enthusiastic", label: "Enthusiastic" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Mail className="h-6 w-6 text-purple-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Email AI Assistant</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">{visitorCount} visitors</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Compose Your Email</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Tone
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {toneOptions.find((option) => option.value === tone)?.label}
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm">
                      {toneOptions.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                          onClick={() => {
                            setTone(option.value)
                            setIsDropdownOpen(false)
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="emailContent" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Content
                </label>
                <textarea
                  id="emailContent"
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your email content here..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Generate Email
                  </>
                )}
              </button>

              {error && <div className="mt-3 text-red-500 text-sm">{error}</div>}
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Response</h2>
  <div className="border border-gray-200 rounded-md p-4 min-h-[300px] bg-gray-50">
    {error ? (
      <div className="text-red-500">{error}</div>
    ) : aiResponse ? (
      <div className="whitespace-pre-line">{aiResponse}</div>
    ) : (
      <div className="text-gray-400 italic">Your AI-generated email will appear here...</div>
    )}
  </div>
</div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md p-6 text-white">
  <div className="flex flex-col md:flex-row items-center justify-between">
    <div className="mb-6 md:mb-0 md:mr-6">
      <h2 className="text-xl font-bold mb-2">Try Our Chrome Extension</h2>
      <p className="text-purple-100">
        Use our AI email assistant directly in your browser with our Chrome extension. Write better emails
        faster, anywhere on the web.
      </p>
      <a
        href="https://drive.google.com/file/d/132PN9Zapf6xvviK9-1SLi7F7vtUi_0Rd/view?usp=drivesdk"
        download
        className="mt-4 bg-white text-purple-700 hover:bg-purple-50 font-medium py-2 px-4 rounded-md transition duration-200 flex items-center"
      >
        <Chrome className="h-4 w-4 mr-2" />
        Add to Chrome
      </a>
    </div>
    <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
  <div className="bg-white/20 rounded-md p-3 mb-3">
    <img
      src="https://via.placeholder.com/150" // Replace with the actual image URL or path
      alt="Chrome Extension Preview"
      className="rounded-md shadow-md"
    />
  </div>
  <div className="bg-white/20 rounded-md p-2 w-3/4 mb-2">
    <p className="text-white text-sm">
      Preview how the Chrome extension integrates seamlessly with Gmail to help you write better emails.
    </p>
  </div>
  <div className="bg-white/20 rounded-md p-2 w-1/2">
    <a
      href="c:\\Users\\debma\\Downloads\\email_Extension.zip"
      download
      className="text-purple-200 hover:text-white transition duration-200 text-sm"
    >
      Download Extension
    </a>
  </div>
</div>
  </div>
</div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email AI Assistant
              </h3>
              <p className="text-gray-400 text-sm mt-1">Craft perfect emails with AI assistance</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App