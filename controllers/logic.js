//import token
const jwt=require('jsonwebtoken')
//import model
const users = require("../models/modelscollection")

//logic for register
const register = (req, res) => {  //create arrow function
    //access data from body
    const acno = req.body.acno
    const uname = req.body.uname
    const psw = req.body.psw
    //check acno is present in users  collection then used to access output to store value to variable user
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(400).send("user already exist")
        }
        else {
            //register user......create a new object for user
            var newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transaction: []
            })
            //save the object in collection
            newUser.save()
            //response send  USE json instead save bcz... this data is in js type it convert to json and send..
            res.status(200).json(newUser)
        }
    })
}
const login = (req, res) => {
    const { acno, psw } = req.body
    users.findOne({ acno, psw }).then(user => {
        if (user) {
            //generate token
            var token=jwt.sign({acno},"secretkey123")
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                token
            })
            //user["token"]=token
        }
        else {
            res.status(400).json("INCORRECT ACCOUNT NUMBER OR PASSWORD")
        }
    })

}
//logic to get profile datas
const getprofile = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname

            })
        }
        else {
            res.status(401).json("user not exist")
        }
    })
}
const getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname,
                balance: user.balance
            })
        }
        else {
            res.status(401).json("user not exist")
        }
    })

}
const moneyTransfer = (req, res) => {
    //access  all data from body
    const { fromacno, toACno, psw, amount, date } = req.body
    //convert amount string type to integer type
    var amnt = parseInt(amount)
    //check fromUser in db
    users.findOne({ acno: fromacno, psw }).then(fromUser => {
        if (fromUser) {
            //check toUser in db
            users.findOne({ acno: toACno }).then(toUser => {
                if (toUser) {
                    if (amnt <= fromUser.balance) {
                        fromUser.balance -= amnt
                        fromUser.transaction.push({ type: "DEBIT", amount: amnt, date, user: toUser.uname })
                        fromUser.save()

                        toUser.balance += amnt
                        toUser.transaction.push({ type: "CREDIT", amount: amnt, date, user: fromUser.uname })
                        toUser.save()
                        res.status(200).json({ message: "Transaction Success" })
                    }
                    else {
                        res.status(401).json({ message: "Insufficient  Balance" })
                    }

                }
                else {
                    res.status(401).json({ message: "Invalid Credit Credentials" })
                }
            })

        }
        else {
            res.status(401).json({ message: "Invalid Debit Credentials" })
        }
    })

}
const history = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json(user.transaction)
        }
        else {
            res.status(401).json("user not exist")
        }
    })
}
//logic for delete account
const deleteAc = (req, res) => {
    const { acno } = req.params
    users.deleteOne({ acno }).then(user => {
        if (user) {
            res.status(200).json("account deleted successfully")
        }
        else {
            res.status(401).json("user does not exist")
        }
    })

}
module.exports = {
    register, login, getprofile, getBalance, moneyTransfer, history, deleteAc
}