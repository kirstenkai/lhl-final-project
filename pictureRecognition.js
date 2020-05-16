const { ClarifaiStub } = require("clarifai-nodejs-grpc");
const grpc = require("@grpc/grpc-js");

require("dotenv").config();
const key = process.env.CLARIFAY_KEY;

// Construct one of the stubs you want to use
const stub = ClarifaiStub.json();
//const stub = ClarifaiStub.insecureGrpc();

// This will be used by every Clarifai endpoint call.

const metadata = new grpc.Metadata();
metadata.set("authorization", key);

const imageURL =
  "https://www.highriveronline.com/images/stories/news_photos_2018/ag/general/milk_june_1.JPG";

stub.PostModelOutputs(
  {
    model_id: "bd367be194cf45149e75f01d59f77ba7", // This is model ID of the food model
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
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
    const output = response.outputs[0];

    console.log("Predicted concepts:");
    for (const concept of output.data.concepts) {
      console.log(concept.name);
    }
  }
);
