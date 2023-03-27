const reviewService = require('../services/reviewService')
const courseService  = require('../services/courseService')

const postReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { comment, title, stars_value } = req.body;

    if(!comment || !title || !stars_value) {
      throw new Error("Estan faltando valores para crear una opinion")
    }

    const courseFound = await courseService.getCourseById(courseId)

    if(!courseFound) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
    }

    const createdComment = await reviewService.createReviewInDatabase({
      comment,
      title,
      stars_value,
      courseId: courseFound.id
    })

    if(!createdComment) {
      throw new Error("No ha sido posible crear una opinion")
    }

    res.status(201).json({message: "Opinion creada exitosamente", data: createdComment})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const getAllReviewsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    if(!courseId) throw new Error("No se ha recibido un id de un curso")

    const courseFound = await courseService.getCourseById(courseId)

    if(!courseFound) {
      throw new Error(`No se ha encontrado ningun curso con este ID: ${courseId}`)
    }

    const { Reviews } = await reviewService.getReviewsByCourseId(courseFound.id)

    if(!Reviews.length) throw new Error("No se han encontrado opiniones de este curso");

    res.status(200).json({message: "Opiniones encontradas con exito", data: Reviews})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

const putReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const foundReview = await reviewService.getReviewById(reviewId)

    if(!foundReview) {
      throw new Error(`No se ha encontrado ninguna opinion con el ID: ${reviewId}`)
    }

    const updatedReview = await reviewService.updateReview({
      id: reviewId,
      data: req.body
    })
    
    res.status(200).json({message: "Opinion actualizada con exito", data: updatedReview})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const foundReview = await reviewService.getReviewById(reviewId)

    if(!foundReview) {
      throw new Error(`No se ha encontrado ningun comentario con el ID: ${reviewId}`)
    }

    await reviewService.deleteReviewFromDB(reviewId)
    
    res.status(200).json({message: "Opinion eliminada con exito"})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const restoreComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    
    if(!commentId) throw new Error("No se ha recibido un id de un comentario")

    const foundComment = await reviewService.getCommentById(commentId)

    if(!foundComment) {
      throw new Error(`No se ha encontrado ningun comentario con el ID: ${commentId}`)
    }

    await reviewService.restoreCommentFromDB(commentId)
    
    res.status(200).json({ msg: "Comentario restaurado con exito" })
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

module.exports = {
  postReview,
  getAllReviewsByCourseId,
  putReview,
  deleteReview,
  restoreComment
}