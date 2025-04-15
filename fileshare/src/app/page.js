"use client";
import { useState } from "react";
import GithubIcon from "./Icons/GithubIcon";
import Link from "next/link";
export default function Home() {
  const [mode, setMode] = useState("send");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          console.error("Upload failed:", response.statusText);
        } else {
          console.log("Files uploaded successfully");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex justify-between items-center backdrop-blur-xl bg-gray-950 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#EC4899]">
          FileShareX
        </h1>
        <Link className="text-white" href="https://github.com/mnkraj/FileShare">
          <GithubIcon />
        </Link>
      </nav>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-grow p-0">
        <h2 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#EC4899] drop-shadow-xl">
          Anonymous File Sharing
        </h2>
        <p className="text-white/70 mb-5 text-lg">
          Max File Size: <strong className="text-[#A855F7]">100MB</strong>
        </p>

        {/* Toggle Card */}
        <div className="w-full max-w-lg bg-gray-900 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-[#A855F7]/50 ">
          <div className="flex mb-6 rounded-full overflow-hidden bg-[#1A0B2E]/50 border border-white/20 ">
            <button
              className={`flex-1 py-3 font-semibold cursor-pointer transition-all duration-300 ${
                mode === "send"
                  ? "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white shadow-lg"
                  : "bg-transparent text-white/70 hover:bg-white/10"
              }`}
              onClick={() => setMode("send")}
            >
              Send
            </button>
            <button
              className={`flex-1 py-3 font-semibold cursor-pointer transition-all duration-300 ${
                mode === "receive"
                  ? "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white shadow-lg"
                  : "bg-transparent text-white/70 hover:bg-white/10"
              }`}
              onClick={() => setMode("receive")}
            >
              Receive
            </button>
          </div>

          {mode === "send" ? (
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm text-white/80 font-medium">
                  Upload file(s)
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full mt-2 text-white bg-[#1A0B2E]/50 p-3 rounded-xl border border-white/20 hover:border-[#A855F7] transition-colors duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#A855F7] file:text-white file:hover:bg-[#EC4899] file:transition-colors"
                />
              </label>
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-white/80 font-medium">
                    Selected Files:
                  </span>
                  <ul className="list-none space-y-2">
                    {selectedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center p-3 bg-[#1A0B2E]/50 rounded-xl border border-white/20 hover:border-[#A855F7] transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-[#A855F7]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-white/90 truncate">
                          {file.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <label className="block">
                <span className="text-sm text-white/80 font-medium">
                  Or paste text
                </span>
                <textarea
                  placeholder="Your message..."
                  className="block w-full mt-2 bg-[#1A0B2E]/50 text-white p-3 rounded-xl border border-white/20 h-36 resize-none hover:border-[#A855F7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
                />
              </label>
              <button className="w-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] hover:from-[#EC4899] hover:to-[#A855F7] transition-all duration-300 py-3 rounded-xl font-semibold shadow-lg hover:shadow-[#A855F7]/50">
                Send
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-white/80 font-medium">
                Enter 4-digit code
              </p>
              <div className="flex justify-between gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    className="w-14 h-14 text-center bg-[#1A0B2E]/50 text-white text-2xl rounded-xl border border-white/20 hover:border-[#A855F7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
                  />
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] hover:from-[#EC4899] hover:to-[#A855F7] transition-all duration-300 py-3 rounded-xl font-semibold shadow-lg hover:shadow-[#A855F7]/50">
                Receive
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center  py-5 text-sm   bg-gray-950/50 backdrop-blur-xl">
        Built with 💜 by You
      </footer>
    </div>
  );
}
