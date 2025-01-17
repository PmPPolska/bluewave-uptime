const PageSpeedCheck = require("../models/PageSpeedCheck");
const axios = require("axios");
const logger = require("../utils/logger");

class PageSpeedService {
  constructor() {
    this.SERVICE_NAME = "PageSpeedService";
  }

  /**
   * Runs a PageSpeed check using Google Lighthouse API.
   * @param {string} url - The URL to check.
   * @returns {Promise<Object>} The results from the PageSpeed API.
   */
  async runPageSpeedCheck(url) {
    try {
      const response = await axios.get(
        "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.google.com&category=seo&category=accessibility&category=best-practices&category=performance"
      );

      return response.data;
    } catch (error) {
      logger.error(`Error running PageSpeed check for ${url}`, {
        service: this.SERVICE_NAME,
        error: error.message,
      });
      error.service === undefined ? (error.service = SERVICE_NAME) : null;
      error.method === undefined ? (error.method = "runPageSpeedCheck") : null;
      throw error;
    }
  }

  /**
   * Creates a new PageSpeedCheck document.
   * @param {Object} data - The data for the new PageSpeedCheck.
   * @returns {Promise<PageSpeedCheck>} The created PageSpeedCheck document.
   */
  async createPageSpeedCheck(data) {
    try {
      const newPageSpeedCheck = new PageSpeedCheck(data);
      return await newPageSpeedCheck.save();
    } catch (error) {
      error.service === undefined ? (error.service = SERVICE_NAME) : null;
      error.method === undefined
        ? (error.method = "createPageSpeedCheck")
        : null;
      throw error;
    }
  }
}

module.exports = PageSpeedService;
