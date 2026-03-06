import Image from 'next/image'
import { PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '../sanity/lib/image'

export const RichTextComponents: PortableTextComponents = {
    types: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-96 m-10 mx-auto">
                    <Image
                        className="object-contain"
                        src={urlForImage(value).url()}
                        alt={value.alt || 'Blog Post Image'}
                        fill
                    />
                </div>
            )
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        video: ({ value }: any) => {
            // Logic for determining if it's an external YouTube/Vimeo URL or a hosted file
            if (value.videoType === 'url' && value.url) {
                // Quick extraction for YouTube - in a real app you'd want a robust parser
                const getYoutubeId = (url: string) => {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
                    const match = url.match(regExp)
                    return match && match[2].length === 11 ? match[2] : null
                }
                const videoId = getYoutubeId(value.url)

                if (videoId) {
                    return (
                        <div className="relative w-full aspect-video my-8">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                            />
                            {value.caption && <p className="text-center text-sm text-gray-500 mt-2">{value.caption}</p>}
                        </div>
                    )
                }
                return (
                    <div className="my-8 text-center text-red-500 border p-4">
                        Unsupported video URL provided constraint.
                    </div>
                )
            } else if (value.videoType === 'file' && value.videoFile?.asset?._ref) {
                // You would need to resolve the file URL using sanity client here instead of URL for Image
                // For simplicity in this demo, let's just render a standard video tag assuming we fetch the URL
                const fileRef = value.videoFile.asset._ref
                // Basic ref parsing for Sanity file assets: file-UUID-mp4
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_type, id, extension] = fileRef.split('-')
                const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
                const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
                const fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`

                return (
                    <div className="my-8">
                        <video controls className="w-full rounded-lg">
                            <source src={fileUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {value.caption && <p className="text-center text-sm text-gray-500 mt-2">{value.caption}</p>}
                    </div>
                )
            }
            return null
        },
    },
    marks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="underline decoration-purple-500 hover:decoration-black"
                >
                    {children}
                </a>
            )
        },
    },
}
