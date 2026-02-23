import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://khaleefaholidays.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // In a real app with dynamic routes, you would fetch them here
        // and map them to sitemap entries.
    ]
}
