const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require('../models/user.model.js')

class UserController {
    constructor(model) {
        this.model = model;

        this.register = this.register.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.login = this.login.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async getUsers(req, res) {
        try {

            const user = await this.model.find(req.body.data);
            res.status(200).send({
                message: 'Successfully fetched user info',
                data: user
            })
        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    }


    getUser = async (req, res) => {
        try {
            const user = await this.model.findById({ _id: req.params._id });
            res.status(200).send({
                message: 'Successfully fetched user info',
                data: user
            })
        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    }

    async register(req, res) {
        console.log(req.body.tag)
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        try{
            UserModel.findOne({email: req.body.email}).then(user => {
                if (user) {
                    res.status(400).json({message: "A user with this E-Mail already exists, consider using another one"})
                    return
                }
                else {
                    const newUser = new this.model({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        company: req.body.company
                    });
                    console.log(this.model.modelName)
                    if(this.model.modelName === "Supplier"){
                        newUser["category"] = req.body.tag
                    }


                    // Hash password before saving in database
                    bcrypt.genSalt(10,(err, salt) => {
                        bcrypt.hash(newUser.password,salt,(err1, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(customer => res.status(200).json(customer))
                                .catch(err => res.status(400).send(err))
                        })
                    })
                }
            })
        } catch (e) {
            res.status(400).send();
        }
    };

    async checkTokenValidity(req, res) {
        res.status(200).json({
            message: "Token still valid"
        })
    }

    async login(req, res) {
        // Form validation
        const { errors, isValid } = validateLoginInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json({message : errors});
        }
        const email = req.body.email;
        const password = req.body.password;
        // Find user by email
         this.model.findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: "Email nicht gefunden" });
            }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        process.env.SECRET_OR_KEY,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res
                                .status(200)
                                .json({
                                success: true,
                                token: "Bearer " + token,
                                userId: user._id
                            });
                        }
                    );
                } else {
                    return res
                        .status(401)
                        .json({ message: "Passwort falsch" });
                }
            });
        });
    };

    updateUser = async (req, res) => {
        try {
            console.log(req.body);
            console.log(req.body.category)
            const user = await this.model.findByIdAndUpdate({ _id: req.params._id }, req.body, {
                new: true,
                runValidators: true
            })
            console.log(user)
            res.status(200).send({
                message: 'Successfully updated user info',
                data: user
            })
        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    }

    async deleteAll(req, res) {
        try {
            await this.model.deleteMany({}).then(data => {
                res.status(200).send({
                    message: 'Successfully deleted all user info',
                    data: data
                })
            })
        }catch (e) {
            res.status(400).send({
                error: e
            })
        }
    };
}

module.exports = UserController;
