const pool = require('../../db')
const path = require('path')

var room =path.join(__dirname, '../../views/room/RoomsChat.html') 


const rooms = async(req, res) => {
    try{
        const [result1] = await pool.query(`select * from user`)
        res.render('room/Rooms', {
            items: [result1]
        })
    } catch(e) {
    }
    
}

const roomChat = async(req, res) => {
    res.render(room)
}


module.exports = {
    rooms, roomChat
}