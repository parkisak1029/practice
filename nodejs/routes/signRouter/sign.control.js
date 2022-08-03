const session = require('express-session')
const pool = require('../../db')

const login = async(req, res) => {
    res.render('sign/Login')
}

const loginPost = async(req, res) => {
    console.log('login')
    let user_id = req.body.user_id;
    let user_password = req.body.user_password;
    
    console.log("user_id ", user_id)
    console.log("user_password ", user_password)

    const [user] = await pool.query(`SELECT user_id, user_password FROM user where user_id='${user_id}'`)

    if(user.length == 0) {
        res.write("<script>alert('Login Failde')</script>")
        res.write("<script>window.location=\"Login\"</script>")
        res.json({message : '400 Bad Request'})  
    } else if(user_id == user[0].user_id){
        if(user_password == user[0].user_password) {
            req.session.user = {
                id: user_id,
                pw: user_password,
                authorized: true,
            };
            console.log(req.session.user)
            res.redirect('/Home')

            req.session.save(error => {if(error) console.log(error)})
        }
    } else {
        res.write("<script>alert('Login Failde')</script>")
        res.write("<script>window.location=\"Login\"</script>")
        res.json({message : '400 Bad Request'})  
    }
}
const signUp = (req, res) => {
    res.render('sign/SignUp')
}

const signUpPost = async(req, res) => {
    let user_id = req.body.user_id;
    let user_password = req.body.user_password;
    
    const userId = await pool.query(`select * from user where user_id = '${user_id}'`)
    if(userId[0].length === 0) {
        const resultUser = await pool.query(`INSERT INTO user(user_id,user_password)VALUES('${user_id}','${user_password}')`)
        res.redirect(`/sign/Login`)
    } 
        else {
        res.write("<script>alert('Failde')</script>")
        res.write("<script>window.location=\"SignUp\"</script>")
        }
}

const logOut = async(req, res) => {
    res.redirect(`/sign/Login`)
}


module.exports = {
   login ,signUp, signUpPost, loginPost, logOut
}