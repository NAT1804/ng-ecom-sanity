const PROJECT_ID = "gmpxxvqp";
const DATASET = "production";

if (!PROJECT_ID || !DATASET) {
  throw new Error(
    "Sanity project ID and dataset name are required."
  );
}

export const environment = {
  production: false,
  sanity: {
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2022-03-07",
    useCdn: true,
  },
};