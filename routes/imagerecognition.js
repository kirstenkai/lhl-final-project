const express = require("express");
const router = express.Router();
const { ClarifaiStub } = require("clarifai-nodejs-grpc");
const grpc = require("@grpc/grpc-js");

require("dotenv").config();
const stub = ClarifaiStub.json();
const metadata = new grpc.Metadata();
metadata.set("authorization", process.env.CLARIFAY_KEY);

module.exports = () => {
  router.post("/", (req, res) => {
    stub.PostModelOutputs(
      {
        model_id: "bd367be194cf45149e75f01d59f77ba7", // This is model ID of the food model
        inputs: [
          {
            data: {
              image: {
                url: req.body.imageURL,
              },
            },
          },
        ],
        model: { output_info: { output_config: { min_value: 0.95 } } },
      },
      metadata,
      (err, response) => {
        if (err) {
          throw new Error(err);
        }
        if (response.status.code !== 10000) {
          throw new Error(
            "Post model outputs failed, status: " + response.status.description
          );
        }
        // Since we have one input, one output will exist here.
        const output = response.outputs[0].data.concepts[0].name;
        res.json({ output });
      }
    );
  });
  return router;
};
