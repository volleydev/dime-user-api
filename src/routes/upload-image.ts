import formidable from "formidable";

export const imageUpload = (req, res) => {
  const { storage, database } = req;

  const form = new formidable.IncomingForm();

  const handleParse = async (error, fields, files) => {
    if (error) {
      res.end({
        error,
        message: "Error pccured during form.parse in 'upload-image.ts'",
      });
    }

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
    const timestamp = Date.now();
    const destination = `times/${timestamp}.${
      files.filetoupload.type.split("/")[1]
    }`;

    const images = database.collection("images");

    let bucketResponse;

    try {
      bucketResponse = await bucket.upload(files.filetoupload.path, {
        destination,
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
    } catch (error) {
      console.log("Bucket Error", error);
      res.end({ error });
    }

    let imageReference;

    const url =
      process.env.GCP_STORAGE_URL +
      process.env.GCP_BUCKET_NAME +
      "/" +
      destination;

    try {
      imageReference = await images.add({
        destination,
        url,
        timestamp,
        bucketId: bucketResponse[0].metadata.id,
      });
    } catch (error) {
      console.log("Database Error", error);
    }

    res.send({ id: imageReference.id, url });
  };

  form.parse(req, handleParse);
};
