const Dishes = require('express').Router(),
bodyParser = require('body-parser'),
dishController = require('../controller/dishController');

//get all dishes
Dishes.get('/',function(req,res,next){

	dishController.getAllDishes(function(err,dishes){

		// if error than handle it
		if(err) return next(err);
		
		// if dishes are not found the return not found 
		if(dishes){
			res.status(200).json(dishes);
			
		}else{
			res.status(404).json({"message":"No dish found"});
		}
		

	});
});

Dishes.get('/:id',function(req,res,next){
	dishController.getDishById(req.params.id,function(err,dish){

		if(err) return next(err);
		
		// if dishes are not found the return not found 
		if(dish){
			res.status(200).json(dish);
			
		}else{
			res.status(404).json({"message":"No dish found with id " + req.params.id});
		}
		
	});
});

Dishes.post('/',function(req,res,next){
	dishController.save(req.body,function(err,dish){
		if(err){
			if(err.code == "11000"){

				var error = new Error();
				error.status = 400;
				error.error = "Dish already exists with this name";
				return next(error);
			}
			return next(err);
		}

		res.status(201).json(dish);
	});
});

Dishes.put('/:id',function(req,res,next){

	dishController.update(req.params.id, req.body, function(err,dish) {

		if(err){
			err.status = 400;
			return next(err);
		}else{
			
			// if dishes are not found the return not found 
			if(dish){
				res.status(200).json(dish);
				
			}else{
				res.status(404).json({"message":"No dish found with id " + req.params.id});
			}
			
		}
	});

});

Dishes.delete('/:id',function(req,res,next){
	dishController.delete(req.params.id, function(err,dish) {
		if(err){
			err.status = 400;
			return next(err);
		}else{	
			// if dishes are not found the return not found 
			if(dish){
				res.status(202).json({"message":"Dish has been deleted"});
				
			}else{
				res.status(404).json({"message":"No dish found with id " + req.params.id});
			}
			
	
		}
	});

});

Dishes.get('/:id/comments',function(req,res,next){
	dishController.getAllComments(req.params.id, function(err,comments) {
		if(err) return next(err);
		
		if(comments){
			res.status(200).json(comments);
		} else{
			res.status(404).json({"message":"No comment found"});
		}
		
	});
	
});

Dishes.get('/:id/comments/:commentId',function(req,res,next){
	dishController.getCommentByID(req.params.id,req.params.commentId, function(err,comment) {
		if(err) return next(err);
		
		if(comment){
			res.status(200).json(comment);
		} else{
			res.status(404).json({"message":"No comment found"});
		}
		
	});
	
});

Dishes.put('/:id/comments/:commentId',function(req,res,next){
	dishController.updateCommentByID(req.params.id,req.params.commentId,req.body, function(err,comment) {
		if(err) return next(err);
		
		if(comment){
			res.status(200).json(comment);
		} else{
			res.status(404).json({"message":"No comment found"});
		}
		
	});
	
});

module.exports = Dishes;