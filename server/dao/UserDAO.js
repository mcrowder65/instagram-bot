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
	},
	login: function(data, res) {
		user.findOne({username: data.username}, 
		function(err, tempUser) {
			if (err) {
			    res.sendStatus(403);
			    return;
			}
	        if (tempUser && tempUser.checkPassword(data.password)) {
	            var token = tempUser._id;
	            res.json({token:token});
	       	} else {
	            res.sendStatus(403);
	        }
		});
	},
	getById: function(data, res) {
		user.findOne({_id: data}, 
		function(err, tempUser) {
			if (err) {
			    res.sendStatus(403);
			    return;
			}
	        if (tempUser) {
	        	var data = {
	        		followsPerDay: tempUser.followsPerDay,
	        		instagramUsername: tempUser.instagramUsername,
	        		maxLikesForOneTag: tempUser.maxLikesForOneTag,
	        		unfollowsPerDay: tempUser.unfollowsPerDay,
	        		tags: tempUser.tags,
	        		likesPerDay: tempUser.likesPerDay
	        	}
	            res.json({data});
	       	} 
	        else {
	            res.sendStatus(403);
	        }
		});
	}
	
}

