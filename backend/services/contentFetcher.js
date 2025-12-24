const axios = require('axios');
const Parser = require('rss-parser');
const cron = require('node-cron');
const Content = require('../models/Content');

const parser = new Parser();

class ContentFetcher {
  constructor() {
    this.startScheduledFetching();
  }

  async fetchNews() {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country: 'us',
          category: 'technology',
          apiKey: process.env.NEWS_API_KEY
        }
      });

      for (const article of response.data.articles.slice(0, 5)) {
        await Content.findOneAndUpdate(
          { url: article.url },
          {
            title: article.title,
            content: article.description || article.content,
            domain: 'news',
            source: article.source.name,
            url: article.url,
            publishedAt: new Date(article.publishedAt)
          },
          { upsert: true, new: true }
        );
      }
    } catch (error) {
      console.error('Error fetching news:', error.message);
    }
  }

  async fetchArxivPapers() {
    try {
      const feed = await parser.parseURL('http://export.arxiv.org/rss/cs.AI');
      
      for (const item of feed.items.slice(0, 3)) {
        await Content.findOneAndUpdate(
          { url: item.link },
          {
            title: item.title,
            content: item.contentSnippet || item.content,
            domain: 'ai',
            source: 'arXiv',
            url: item.link,
            publishedAt: new Date(item.pubDate)
          },
          { upsert: true, new: true }
        );
      }
    } catch (error) {
      console.error('Error fetching arXiv papers:', error.message);
    }
  }

  async fetchGeneralKnowledge() {
    const topics = ['science', 'history', 'technology'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: randomTopic,
          sortBy: 'popularity',
          pageSize: 3,
          apiKey: process.env.NEWS_API_KEY
        }
      });

      for (const article of response.data.articles) {
        await Content.findOneAndUpdate(
          { url: article.url },
          {
            title: article.title,
            content: article.description,
            domain: 'general',
            source: article.source.name,
            url: article.url,
            publishedAt: new Date(article.publishedAt),
            tags: [randomTopic]
          },
          { upsert: true, new: true }
        );
      }
    } catch (error) {
      console.error('Error fetching general knowledge:', error.message);
    }
  }

  startScheduledFetching() {
    // Fetch content every hour
    cron.schedule('0 * * * *', async () => {
      console.log('Fetching fresh content...');
      await this.fetchNews();
      await this.fetchArxivPapers();
      await this.fetchGeneralKnowledge();
    });

    // Initial fetch
    this.fetchNews();
    this.fetchArxivPapers();
    this.fetchGeneralKnowledge();
  }
}

module.exports = new ContentFetcher();