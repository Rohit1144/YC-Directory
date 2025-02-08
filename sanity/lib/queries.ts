import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = 
defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  _createdAt,
  slug,
  author -> {
    _id,
    bio,
    image,
    name
  },
  views,
  title,
  pitch,
  image,
  category,
  description
}`
)