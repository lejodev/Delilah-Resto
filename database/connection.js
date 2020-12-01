const connectionParameters = require('./db_connection_parameters');
const Sequelize = require('sequelize');
// const path = ('mysql://root@localhost:3306/DelilahResto');
// const sequelize = new Sequelize(path, {operatorAliases : false});
const sequelize = new Sequelize(connectionParameters.db_conf_dbName,
    connectionParameters.db_conf_user,
    connectionParameters.db_conf_password,
    {
        host: connectionParameters.db_conf_host,
        dialect : 'mysql',
        port: connectionParameters.db_conf_port,
        dialectOptions: {
            multipleStatements: true
        },
    })

sequelize.authenticate().then(() => {
    console.log('Signed');
}).catch(err => {
    console.log(`Database authentication error: ${err}`);
});

module.exports = sequelize;