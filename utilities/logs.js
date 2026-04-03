class Logger {
  /**
   * Log a test step to console with formatted output
   * @param {string} message - Step description
   */
  static step(message) {
    console.log(`\n Step ${message}`);
  }
}
 
export default Logger;