import Article from "../models/article.js";
export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const article = await Article.create({
      userId: req.user.id,
      title,
      content,
    });

    res.status(201).json({ success: true, article });
  } catch (error) {
    res.status(500).json({ message: "Error creating article" });
  }
};

export const getArticles = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const articles =await Article.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles" });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found or unauthorized" });
    }

    res.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Error deleting article" });
  }
};