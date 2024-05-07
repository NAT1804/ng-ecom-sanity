import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image_url_builder";

export const client = sanityClient({
  projectId: "gmpxxvqp",
  dataset: "production",
  apiVersion: "2023-05-07",
  useCdn: true,
  token: "skGiHATrdRAUIpJY57XM7oWUMSRfjkEP9qTT7MACXkCg0C4T6XxUd9i7ipMIIqxubfIVj9dWqz9nXumwjsDGqr4qJTSQFVa8CmqUFVMW4pWDEHjiekcFGSzDiIl1hLnmVR2GwH56fdMV8kywa6YZEvDPhJco7E490abLgrrZgq2bq6HsKcXF",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);