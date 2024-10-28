import express from 'express';
import User from '../models/user_model.js';

const router = express.Router();
/**GET user by email */
router.get('/user', (req, res) => {
    const email = req.body.useremail;
    User.findOne({ useremail: email }).exec().then(user => {
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(
            {
                "username": user.username,
                "useremail": user.useremail,
                "userpass": user.userpass
            }
        );
})

        .catch(error => {
            res.status(500).send('Error');
        });
});
/**POST */
router.post('/user', (req, res) => {
    const { username, useremail, userpass } = req.body;
    const user = {
        username: username,
        useremail: useremail,
        userpass: userpass
    };
    User.create(user).then(() => {
        console.log('User added');
        res.status(201).json(user);//not sure in it 
    }).catch((e) => {
        console.log(e);
        res.status(500).send('Error creating user');
    });
});
/**PUT - Update by mail*/
router.put('/user', (req, res) => {
    const { username, useremail, userpass } = req.body;
    User.findOneAndUpdate({ useremail: useremail }, {useremail: useremail, userpass: userpass},{ new: true, runValidators: true } ).exec()
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            res.status(200).send({
                message: 'User updated successfully',
                user: {
                    username: updatedUser.username,
                    useremail: updatedUser.useremail,
                    userpass: updatedUser.userpass
                }
            });
        })
        .catch(e => {
            console.log(e);
            res.status(500).send('Error updating user');
        });
});
/**DELETE by email */
router.delete('/user', (req, res) => {
    const email = req.body.useremail;
    User.deleteOne({ useremail: email }).exec()
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send('User not found');
            }
            console.log('User has been deleted');
            res.status(200).send('Deleted successfully');
        })
        .catch(e => {
            console.log(e);
            res.status(500).send('Error deleting user');
        });
});

export default router;
