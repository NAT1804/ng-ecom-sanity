import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface IBanner {
    buttonText: string;
    image: SanityImageSource;
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
  }