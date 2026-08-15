import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Click Generate - don't type this by hand. It becomes the post's URL.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) return "Required - click Generate above.";
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
            ? true
            : "Invalid slug - click Generate instead of typing it manually (no spaces or capital letters allowed).";
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "Short summary shown on the blog listing page and used as a fallback SEO description.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Polish Station",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      description: "Overrides the excerpt in search results and social previews, if set.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", publishedAt: "publishedAt" },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft",
        media,
      };
    },
  },
});
