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
      const response = await axios.post("https://email-writer-backend-latest.onrender.com/api/email/generate", {
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #E8F5E8, #D4E6D4)' }}>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/replygenius-logo.svg" 
              alt="ReplyGenius Logo" 
              className="h-12 w-auto"
            />
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
                    className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-left focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#038762' }}
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
                          className="px-4 py-2 cursor-pointer"
                          style={{ 
                            '&:hover': { backgroundColor: '#E8F5E8' }
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#E8F5E8'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#038762' }}
                  placeholder="Type your email content here..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
                style={{ 
                  backgroundColor: '#038762',
                  '&:hover': { backgroundColor: '#026B4F' }
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#026B4F'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#038762'}
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

        {/* Chrome Extension Section - Redesigned */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="text-center py-8 px-6" style={{ background: 'linear-gradient(135deg, #038762, #026B4F)' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Chrome className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">ReplyGenius Extension</h2>
            <p className="text-lg" style={{ color: '#D4E6D4' }}>
              Supercharge your email workflow
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Write Better Emails, Faster
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get AI-powered email suggestions directly in Gmail, Outlook, and any email platform. 
                    Our Chrome extension seamlessly integrates with your workflow to help you craft 
                    professional emails in seconds.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#038762' }}></div>
                    <span className="text-gray-700">Works with Gmail, Outlook & more</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#038762' }}></div>
                    <span className="text-gray-700">AI-powered tone suggestions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#038762' }}></div>
                    <span className="text-gray-700">One-click email generation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#038762' }}></div>
                    <span className="text-gray-700">Privacy-focused design</span>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {/* <a
                    href="https://drive.google.com/file/d/132PN9Zapf6xvviK9-1SLi7F7vtUi_0Rd/view?usp=drivesdk"
                    download
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 shadow-lg"
                    style={{ 
                      backgroundColor: '#038762',
                      '&:hover': { backgroundColor: '#026B4F' }
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#026B4F'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#038762'}
                  >
                    <Chrome className="h-5 w-5 mr-2" />
                    Add to Chrome
                  </a> */}
                  <a
                    href="https://drive.google.com/file/d/132PN9Zapf6xvviK9-1SLi7F7vtUi_0Rd/view?usp=drivesdk"
                    download
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 hover:shadow-md"
                    style={{
                      borderColor: '#038762',
                      color: '#038762',
                      '&:hover': { backgroundColor: '#E8F5E8' }
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#E8F5E8'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download ZIP
                  </a>
                </div>
              </div>

              {/* Right Content - Preview */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-inner">
                  {/* Browser Window Mockup */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Browser Header */}
                    <div className="flex items-center space-x-2 px-4 py-3 bg-gray-100 border-b">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">
                        gmail.com
                      </div>
                    </div>
                    
                    {/* Email Interface */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#038762' }}></div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500">To: john@company.com</div>
                          <div className="text-sm font-medium">Re: Project Update</div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="text-xs text-gray-600 mb-2">ReplyGenius AI</div>
                        <div className="text-sm text-gray-800">
                          "Thank you for your email. I'll review the project details and get back to you by Friday..."
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t">
                          <span className="text-xs text-gray-500">Professional tone</span>
                          {/* <button className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: '#038762' }}>
                            Use This
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                ReplyGenius
              </h3>
              <p className="text-gray-400 text-sm mt-1">Your Email Assistant - Craft perfect emails with AI</p>
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