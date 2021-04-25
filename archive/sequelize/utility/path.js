const path = require('path');

/**
 * GETS THE ROOT DIRECTORY
 * 
 * 
 * Since v14.0.0, mainModule is deprecated.
 * So instead of:
 * 
 *      module.exports = path.dirname(process.mainModule.filename)
 * 
 *  Now, you can achieve * the same thing just by writing the following line:
 * 
 *      module.exports = path.dirname(require.main.filename);
 * 
 */
module.exports = path.dirname(require.main.filename);