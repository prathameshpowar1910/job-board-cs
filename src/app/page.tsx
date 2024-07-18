'use client'

import { useState, useEffect } from 'react'
import { JobCard } from '@/components/JobCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getJobs } from '@/lib/supabase'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Define the Job type
interface Job {
  id: string;
  date: string;
  company_name: string;
  job_role: string;
  experience_level: string;
  application_link: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getJobs()
      setJobs(fetchedJobs)
      setFilteredJobs(fetchedJobs)
    }
    fetchJobs()
  }, [])

  const handleSearch = () => {
    const filtered = jobs.filter(job =>
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.job_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.experience_level.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredJobs(filtered)
  }

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fresher Job Openings</h1>
        <ThemeToggle />
      </header>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {filteredJobs && filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              date={job.date}
              company={job.company_name}
              role={job.job_role}
              experienceLevel={job.experience_level}
              applicationLink={job.application_link}
            />
          ))}
        </div>
      ) : (
        <p>No job openings available at the moment.</p>
      )}
    </main>
  )
}