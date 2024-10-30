import express from 'express';
import User from '../models/user_model.js';
import bcrypt from 'bcrypt'

const saltRounds = 10;

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
router.post('/user', async (req, res) => {
    const { username, useremail, userpass } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(userpass, saltRounds);
        
        const user = {
            username: username,
            useremail: useremail,
            userpass: hashedPassword
        };

        await User.create(user);
        console.log('User added');
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating user');
    }
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

router.post('/vereficate_password', async (req, res) => {
    const { useremail, userpass } = req.body;
    try {
        const user = await User.findOne({ useremail: useremail });
        if (!user) {
            console.log("User not found.");
            return res.status(404).send("User not found. Mail isn't correct or password");
        }
        if (bcrypt.compare(user.userpass, userpass)) {
            console.log("Password verification successful.");
            return res.status(200).send("Password verification successful");
        } else {
            console.log("Password verification failed.");
            return res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).send("Error verifying password");
    }
});
export default router;
