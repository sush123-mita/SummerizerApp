import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Sun,
  Moon,
  LogOut,
  History,
  FileText,
  Plus,
  Copy,
  Check,
  Trash2,
} from "lucide-react";
import {
  createArticle,
  getArticle,
  deleteArticle,
  summarizeText,
  getSummaries,
} from "../utils/api.js"; // ✅ only import what you actually use

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("summarize");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleForm, setArticleForm] = useState({ title: "", content: "" });
  const [copied, setCopied] = useState(false);

  // 🔒 Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully 👋");
    window.location.href = "/login";
  };

  // 🧠 Load data depending on tab
  useEffect(() => {
    if (activeTab === "history") loadSummaries();
    if (activeTab === "articles") loadArticles();
  }, [activeTab]);

  // 🧾 Load Summaries
  const loadSummaries = async () => {
    try {
      const { data } = await getSummaries();
      setSummaries(data?.summaries || []);
    } catch (err) {
      console.error("❌ Error fetching summaries:", err);
      alert("Failed to load summaries.");
    }
  };

  // 📰 Load Articles
  const loadArticles = async () => {
    try {
      const { data } = await getArticle();
      setArticles(data?.articles || []);
    } catch (err) {
      console.error("❌ Error fetching articles:", err);
      alert("Failed to load articles.");
    }
  };

  // ✂️ Summarize Text
  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const { data } = await summarizeText({ text });
      setSummary(data?.summary || "No summary generated.");
    } catch (err) {
      console.error("❌ Summarization error:", err);
      alert(err.response?.data?.message || "Summarization failed.");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create New Article
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.content.trim())
      return alert("Please fill in all fields.");
    try {
      await createArticle(articleForm);
      setArticleForm({ title: "", content: "" });
      await loadArticles();
      alert("✅ Article created!");
    } catch (err) {
      console.error("❌ Error creating article:", err);
      alert(err.response?.data?.message || "Failed to create article.");
    }
  };

  // 🗑️ Delete Article
  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (err) {
      
      console.error("❌ Error deleting article:", err);
      alert("Failed to delete article.");
    }
  };

  // 📋 Copy summary
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🎨 Styling classes
  const bgClass = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";
  const textClass = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`${cardClass} shadow-lg sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-linear-to-br from-violet-500 to-purple-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">AI Summarizer</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-2 mb-6">
          {[
            { id: "summarize", icon: Sparkles, label: "Summarize" },
            { id: "history", icon: History, label: "History" },
            { id: "articles", icon: FileText, label: "Articles" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? "bg-linear-to-r from-violet-600 to-purple-600 text-white"
                  : `${cardClass} hover:bg-gray-100 dark:hover:bg-gray-700`
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* --- Summarizer Tab --- */}
        {activeTab === "summarize" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
              <h2 className="text-xl font-bold mb-4">Input Text</h2>
              <textarea
                className={`w-full h-64 p-4 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-300"
                } focus:ring-2 focus:ring-violet-500 outline-none resize-none`}
                placeholder="Paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                onClick={handleSummarize}
                disabled={loading || !text.trim()}
                className="w-full mt-4 bg-linear-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition disabled:opacity-50"
              >
                {loading ? "Summarizing..." : "Summarize"}
              </button>
            </div>

            <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Summary</h2>
                {summary && (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
              <div
                className={`h-64 p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } overflow-y-auto`}
              >
                {summary ? (
                  <p className="leading-relaxed">{summary}</p>
                ) : (
                  <p className={textClass}>Your summary will appear here...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- History Tab --- */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {summaries.length === 0 ? (
              <div className={`${cardClass} rounded-2xl shadow-xl p-12 text-center`}>
                <History className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className={textClass}>No summaries yet</p>
              </div>
            ) : (
              summaries.map((item) => (
                <div
                  key={item._id}
                  className={`${cardClass} rounded-2xl shadow-xl p-6`}
                >
                  <p className={`${textClass} text-sm mb-2`}>
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <p className="font-semibold mb-2">Summary:</p>
                  <p className="leading-relaxed">{item.summaryText}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* --- Articles Tab --- */}
        {activeTab === "articles" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>New Article</span>
              </h2>
              <form onSubmit={handleCreateArticle} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-300"
                  } focus:ring-2 focus:ring-violet-500 outline-none`}
                  value={articleForm.title}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, title: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Content"
                  className={`w-full h-48 px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-300"
                  } focus:ring-2 focus:ring-violet-500 outline-none resize-none`}
                  value={articleForm.content}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, content: e.target.value })
                  }
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-700 transition"
                >
                  Create Article
                </button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-4">
              {articles.length === 0 ? (
                <div className={`${cardClass} rounded-2xl shadow-xl p-12 text-center`}>
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className={textClass}>No articles yet</p>
                </div>
              ) : (
                articles.map((article) => (
                  <div
                    key={article._id}
                    className={`${cardClass} rounded-2xl shadow-xl p-6`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold">{article.title}</h3>
                      <button
                        onClick={() => handleDeleteArticle(article._id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-500 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className={`${textClass} leading-relaxed`}>
                      {article.content}
                    </p>
                    <p className={`${textClass} text-sm mt-4`}>
                      {new Date(article.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
