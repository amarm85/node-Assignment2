const mongoose = require('mongoose'),
Dishes = require('../models/dishes');

exports.getAllDishes = function(cb){
	Dishes.find({},function(err,dishes){

		if(err) {
			cb(err,null);
		}else{
			cb(null,dishes);
		}

	});
}

exports.getDishById = function(id,cb){

	Dishes.findById(mongoose.Types.ObjectId(id), function(err,dish) {
		if(err){
			cb(err,null);
		}else{
			cb(null,dish)
		}

	})
}

exports.save = function(newDish,cb){
	dish = new Dishes(newDish);
	dish.save(function(err){
		if(err){
			cb(err,null);
		}else{

			cb(null,dish)
		}
	});
}

exports.update = function(id,updatedDish,cb){
	Dishes.findByIdAndUpdate(id,{
		$set:updatedDish
	},{new:true}, function(err,dish) {

		if(err){
			cb(err,null);
		}else{
			cb(null,dish)
		}

	})
}

exports.delete = function(id,cb){
	
	Dishes.findByIdAndRemove(id, function(err,dish) {
		if(err){
			cb(err,null);
		}else{
			cb(null,dish)
		}

	})
	
}

exports.getAllComments = function(id,cb){
	
	Dishes.findById(mongoose.Types.ObjectId(id),function(err,dish){
		if(err){
			cb(err,null);
			}
		else{
			if(dish){
				cb(null,dish.comments);
			}else {
				var err = new Error();
				err.message = " No Dish found with the id " + id;
				err.status = 404;
				cb(err,null);
			}
			
		}
	});
}

exports.getCommentByID =  function(dishId,commentId, cb){
	
	Dishes.findById(mongoose.Types.ObjectId(dishId),function(err,dish){
		
		if(err){
			cb(err,null);
		}else{
			if(dish){
				cb(null,dish.comments.id(commentId));
			}else{
				var err = new Error();
				err.message = " No Dish found with the id " + id;
				err.status = 404;
				cb(err,null);
			}
		}
	});
}

exports.updateCommentByID = function(dishId,commentId,updatedComment,cb){
	Dishes.findById(mongoose.Types.ObjectId(dishId),function(err,dish){
		
		if(err){cb(err,null)}
		else{
			if(dish){
				dish.comments.id(commentId).remove();
				dish.comments.push(updatedComment);
				dish.save(function(err,dish){
					if(err){cb(err,null)}
					else{
						cb(null,dish);
					}
				});
			}else{
				var err = new Error();
				err.message = " No Dish found with the id " + id;
				err.status = 404;
				cb(err,null);
			}
		}
	}
}