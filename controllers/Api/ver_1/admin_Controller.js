
const register = require('../../../models/register');
const User = require('../../../models/userData');
const nodeMailer = require('../../../middleware/node_Mailer');

module.exports.dashBoard = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('dashBoard');
    }
    return res.redirect('/admin/login');
}

module.exports.register = (req, res) => {
    return res.render('register', { layout: 'register' });
}

module.exports.regData = async (req, res) => {
    try {
        if (req.body.password === req.body.cpassword) {
            let data = await register.create(req.body);
            if (!data) {
                console.log('registerData not added' + err);
                return false;
            }
            return res.redirect('/admin/login');
        }
        else {
            console.log('password not match');
        }
    }
    catch (error) {
        console.log('something wrong');
    }
}

module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    }
    return res.render('login', { layout: 'login' });
}

module.exports.loginUser = (req, res) => {
    return res.redirect('/admin');
}

module.exports.logOut = (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log('logOut error');
            return false;
        }
        return res.redirect('/admin/login');
    });
}

module.exports.changePass = (req, res) => {
    return res.render('changePass');
}

module.exports.confirmchangePass = (req, res) => {
    let current = req.user.password;

    let currentpass = req.body.currentpass;
    let newpass = req.body.newpass;
    let confirmpass = req.body.confirmpass;

    if (current === currentpass) {
        if (currentpass !== newpass) {
            if (newpass === confirmpass) {

                let userId = req.user.id;
                register.findByIdAndUpdate(userId, {
                    password: newpass,
                    cpassword: newpass
                }, (err) => {
                    if (err) {
                        console.log('password not changed' + err);
                        return false;
                    }
                    return res.redirect('/admin/logOut');
                })
            }
            else {
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        return res.redirect('back');
    }
}

module.exports.lostPassword = (req, res) => {
    return res.render('lostPassword', { layout: 'lostPassword' });
}

module.exports.recoverPasssword = (req, res) => {
    register.findOne({
        email: req.body.email
    }, (err, userData) => {
        if (err) {
            console.log('userMail not found' + err);
            return false;
        }
        if (userData) {
            let otp = Math.random();
            otp = parseInt(otp * 100000)
            console.log(otp);
            res.cookie('email', req.body.email);
            res.cookie('otp', otp)

            nodeMailer.sendMail({
                from: 'kaushalnena09@zohomail.in',
                to: req.body.email,
                subject: 'otp verification',
                html: 'your otp is:' + otp

            }, (err, data) => {
                if (err) {
                    console.log('otp not send' + err);
                    return false;
                }
                console.log('otp send');
                return res.redirect('/admin/otpPage');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}

module.exports.otpPage = (req, res) => {
    return res.render('otpPage', { layout: 'otpPage' });
}

module.exports.checkOtp = (req, res) => {
    if (req.body.formotp == req.cookies.otp) {
        return res.redirect('/admin/setPassword');
    }
    console.log('invalid otp');
    return res.redirect('back');
}

module.exports.setPassword = (req, res) => {
    return res.render('setPassword', { layout: 'setPassword' });
}

module.exports.newchangePass = (req, res) => {
    if (req.body.npass === req.body.cnfpass) {
        register.findOne({ email: req.cookies.email }, (err, data) => {
            register.findByIdAndUpdate(data.id, {
                password: req.body.npass,
                cpassword: req.body.cnfpass
            }, (err) => {
                if (err) {
                    console.log('invalid request');
                    return false;
                }
                res.cookie('otp', '');
                res.cookie('email', '');
                return res.redirect('/admin/login');
            })
        })
    }
    else {
        return res.redirect('back');
    }
}

module.exports.formBasic = (req, res) => {
    return res.render('formBasic');
}

module.exports.viewForm = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            console.log('data not found' + err);
            return false;
        }
        return res.render('viewForm', {
            'data': data
        });
    });
}

module.exports.addUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, usermail) => {
        if (usermail) {
            console.log('usermail already registered');
            return false;
        }
        else {
            User.create(req.body, (err) => {
                if (err) {
                    console.log('userdata not added' + err);
                    return false
                }
            })
        }
        return res.redirect('back');
    })
}

module.exports.removeData = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log('data not deleted' + err);
            return false;
        }
        return res.redirect('back');
    })
}

module.exports.updateData = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            console.log('data not found' + err);
            return false;
        }
        return res.render('updateData', {
            'single': data
        });
    })
}

module.exports.updateUser = (req, res) => {
    let Id = req.body.id;
    User.findByIdAndUpdate(Id, req.body, (err) => {
        if (err) {
            console.log('data not updated' + err);
            return false
        }
        return res.redirect('/admin/viewForm');
    })
}

