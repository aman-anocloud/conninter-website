import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'video',
    title: 'Video',
    type: 'object',
    fields: [
        defineField({
            name: 'videoType',
            title: 'Video Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Hosted Video File (MP4)', value: 'file' },
                    { title: 'External URL (YouTube/Vimeo)', value: 'url' },
                ],
                layout: 'radio',
            },
            initialValue: 'url',
        }),
        defineField({
            name: 'videoFile',
            title: 'Video File',
            type: 'file',
            options: {
                accept: 'video/mp4,video/x-m4v,video/*',
            },
            hidden: ({ parent }) => parent?.videoType !== 'file',
        }),
        defineField({
            name: 'url',
            title: 'Video URL',
            type: 'url',
            hidden: ({ parent }) => parent?.videoType !== 'url',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            type: 'videoType',
            url: 'url',
            caption: 'caption',
        },
        prepare({ type, url, caption }) {
            return {
                title: type === 'url' ? 'External Video' : 'Hosted Video File',
                subtitle: caption || url || 'No caption provided',
            }
        },
    },
})
