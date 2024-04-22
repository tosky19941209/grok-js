const getToken = require("../other/gettoken")
const verifyToken = require("../other/verifytoken")
const ExtractJwt = require("passport-jwt").ExtractJwt
// const grok = require("grok-js")
exports.test = (req, res) => {
    res.send("Welcome to fitness 1.3")
}

exports.relic = (req, res) => {

    const logdata = req.body.logdata

    res.send("Relic")

}

exports.signup = async(req, res) => {
    const user = require('../model/users')
    const newData = req.body
    const { username, password, email, height, weight } = newData
    user.findOne({ email })
        .then((response) => {
            if (response) {
                res.send({
                    message: "User is already existed"
                })
            } else {
                const newUser = new user(newData)
                newUser.save()
                    .then(() => {
                        res.send({
                            message: "success"
                        })
                    })
                    .catch((err) => {
                        console.log("err: ", err)
                    })
            }
        })
}

exports.signupUpdate = async (req, res) => {
    const user = require('../model/users')
    const header = req.body.header
    const updateData = req.body.updateData
    const { email, password } = header
    user.findOneAndUpdate({
        email: email,
        password: password
    }, updateData, { new: true })
        .then((response) => {
            if (response) {
                res.send({
                    message: "success"
                })
            } else {
                res.send({
                    message: "Email or password is not correct."
                })
            }
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.signin = async (req, res) => {
    console.log("Signin")
    const users = require('../model/users')
    const newData = req.query
    const { email, password } = newData
    users.findOne({ email, password })
        .then((user) => {
            if (user) {
                res.json({
                    name: user.username,
                    token: getToken(user),
                    message: "success"
                })
            } else {
                res.json({
                    name: '',
                    message: "failed"
                })
            }
        })
}

exports.signinWithToken = async (req, res) => {
    res.send(req.body)
}