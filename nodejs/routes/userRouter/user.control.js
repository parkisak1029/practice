const pool = require('../../db')

const users = async(req, res) => {
    try{
    const [result] = await pool.query('SELECT * FROM user')
    const [result1] = await pool.query('SELECT * FROM messages')
        res.render('user/User', {
            items: result && result1
        })
    } catch(e) {
    }
    
}

module.exports = {
    users
}