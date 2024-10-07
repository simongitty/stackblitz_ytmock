import VideoGrid from '@/components/VideoGrid'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <VideoGrid />
      </main>
    </div>
  )
}