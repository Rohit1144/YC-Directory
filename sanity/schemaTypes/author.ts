import { CiUser } from "react-icons/ci";
import { defineField, defineType } from "sanity"

export const author = defineType({
    name: 'author',
    title: 'Authors',
    type: 'document',
    icon: CiUser,
    fields: [
        defineField({
            name: "id",
            type: "number"
        }),
        defineField({
            name: "name",
            type: "string"
        }),
        defineField({
            name: "username",
            type: "string"
        }),
        defineField({
            name: "email",
            type: "string"
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "bio",
            type: "text"
        })
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})