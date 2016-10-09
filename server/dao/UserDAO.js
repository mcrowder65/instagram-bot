var user = require('./../models/user');
module.exports = {
	signUp: function(data, res) {
		user.findOrCreate({
			username: data.username,
			password: user.hashPassword(data.password),
			instagramUsername: '',
			tags: '',
			likesPerDay: -1,
			maxLikesForOneTag: -1,
			followsPerDay: -1,
			unfollowPerDay: -1
		}, function(err, tempUser, created) {
			if(created) {
				var token = user.generateToken(tempUser.username);
		        res.json({token: tempUser._id});
			}
			else if(!created){
				res.sendStatus("403");
			}
		});
	}
	
}

