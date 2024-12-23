import express from 'express'

const router = express.Router();

import {BookReview} from './BookModel.js'




// post data
router.post('/',async(request,respose)=>{

    try{
        if(
            !request.body.Book_Title ||
            !request.body.Author||
            !request.body.Rating||
            !request.body.Review_Text
        ){
            return respose.status(400).send({
                message:'send all the require feilds'
            })
        }

        const newReview ={
            Book_Title:request.body.Book_Title,
            Author:request.body.Author,
            Rating:request.body.Rating,
            Review_Text:request.body.Review_Text,
        }

        const review = await BookReview.create(newReview);
        respose.status(201).send(review)


    }

    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }

});

// get all data

router.get('/',async(request,response)=>{
    try{
        const bookreviews = await BookReview.find({})
        return response.status(200).json({
            count:bookreviews.length,
            data:bookreviews
        });
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

//update data

router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.Book_Title ||
            !request.body.Author||
            !request.body.Rating||
            !request.body.Review_Text
        ){
            return response.status(400).send({
                message:'send all the require feilds'
            })
        }

        const {id} = request.params

        const result = await BookReview.findByIdAndUpdate(id,request.body)

        if(!result){
            return response.status(404).message({message:'Review not found'})
        }

        return response.status(200).send({message:'review update Sucessfully'})
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

//Delete data

router.delete('/:id',async(request,response)=>{

    try{
        const {id} = use.params
        const result = await BookReview.findByIdAndDelete(id);

        if(!result){
            return response.status(400).message({message:'review not found'})
        }

        return response.status(200).send({message:"book delete Sucessfully.."})

    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }

});

export default router;
