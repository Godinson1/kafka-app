import { Request, Response } from "express";
import { CREATE_POST_TOPIC, success, error } from "./constants";
import { producer } from "./index";

/*
//Example for demonstrating producer using a simple create route
* METHOD - POST
* ROUTE - /posts/post
* ARGS - {content: string, photoUrl: string}
*/
const createPost = async (req: Request, res: Response): Promise<Response> => {
  const { content, photoUrl } = req.body;

  //Simple validation check for empty data.
  if (!content || !photoUrl)
    return res
      .status(400)
      .json({ status: error, message: "Please fill all required fields." });

  //New data object..
  const postData = {
    content,
    photoUrl,
  };

  //Save to database here and dispatch data to stream (kafka).
  producer.send({
    topic: CREATE_POST_TOPIC,
    messages: [{ value: JSON.stringify(postData) }],
  });

  //Return successful response after dispatch.
  return res.status(200).json({
    status: success,
    message: "Post created successfully!",
    data: postData,
  });
};

export { createPost };
