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
			unfollowPerDay: -1,
			pid: -1
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
	        		likesPerDay: tempUser.likesPerDay,
	        		pid: tempUser.pid
	        	}
	            res.json({data});
	       	} 
	        else {
	            res.sendStatus(403);
	        }
		});
	},
	setById: function(data, res) {
		var temp = data;
		user.update({_id: temp.id}, {
			followsPerDay: temp.followsPerDay,
    		instagramUsername: temp.instagramUsername,
    		maxLikesForOneTag: temp.maxLikesForOneTag,
    		unfollowsPerDay: temp.unfollowsPerDay,
    		tags: temp.tags,
    		likesPerDay: temp.likesPerDay
		},
		function(err, tempUser){
			if(tempUser) {
				res.json(tempUser);
			} else {
				res.sendStatus("403");
			}
		}); 
	},
	setPid: function(pid, userId, res) {
		user.update({_id: userId}, {
			pid: pid
		}, function(err, tempUser) {
			if(tempUser) {
				res.json({pid:pid});
			} else {
				res.sendStatus("403");
			}
		});
	}
	
}

