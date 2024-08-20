const gamesRoutes = require('./API/games');
const userRoutes = require('./API/auth');
const cartRoutes = require('./API/cart');


module.exports = function(app) {
    app.use('/api', gamesRoutes);
    app.use('/api', userRoutes);
    app.use('/api', cartRoutes);
};