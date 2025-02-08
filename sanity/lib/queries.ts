import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = 
defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || auhtor->name match $search] | order(_createdAt desc) {
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