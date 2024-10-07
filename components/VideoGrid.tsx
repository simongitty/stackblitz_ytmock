"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'

// Updated mock data with tags
const videos = [
  {
    id: '1',
    title: 'Introduction to Next.js',
    description: 'Learn the basics of Next.js and how to build modern web applications.',
    thumbnail: 'https://i.ytimg.com/vi/uQeidE2LA1s/hqdefault.jpg',
    channel: 'Web Dev Simplified',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: '2',
    title: 'React Hooks Explained',
    description: 'A deep dive into React Hooks and how they can simplify your code.',
    thumbnail: 'https://i.ytimg.com/vi/TNhaISOUy6Q/hqdefault.jpg',
    channel: 'Fireship',
    tags: ['React', 'Hooks', 'JavaScript']
  },
  {
    id: '3',
    title: 'CSS Grid Tutorial',
    description: 'Master CSS Grid layout with this comprehensive tutorial.',
    thumbnail: 'https://i.ytimg.com/vi/9zBsdzdE4sM/hqdefault.jpg',
    channel: 'Traversy Media',
    tags: ['CSS', 'Web Design', 'Frontend']
  },
  {
    id: '4',
    title: 'TypeScript Crash Course',
    description: 'Get up to speed with TypeScript in this comprehensive crash course.',
    thumbnail: 'https://i.ytimg.com/vi/BCg4U1FzODs/hqdefault.jpg',
    channel: 'Traversy Media',
    tags: ['TypeScript', 'JavaScript', 'Programming']
  },
]

// Get unique channels and tags
const channels = Array.from(new Set(videos.map(video => video.channel)))
const allTags = Array.from(new Set(videos.flatMap(video => video.tags)))

export default function VideoGrid() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')

  const filteredVideos = videos.filter(video =>
    (video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedChannel === 'all' || video.channel === selectedChannel) &&
    (selectedTag === 'all' || video.tags.includes(selectedTag))
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search videos..."
          className="md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filter by channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            {channels.map(channel => (
              <SelectItem key={channel} value={channel}>{channel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>{video.channel}</CardDescription>
            </CardHeader>
            <CardContent>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
              <div className="flex flex-wrap gap-2">
                {video.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}